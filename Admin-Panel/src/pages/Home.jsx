import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaShoppingCart, FaShareAlt } from 'react-icons/fa';
import '../styles/Home.css';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const bannerImages = [banner1, banner2, banner3];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://deal-mates-project-backend.vercel.app/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, minPrice, maxPrice, category, products]);

  const handleShareClick = (link) => {
    setShareLink(link);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  return (
    <div className="home-container bg-light min-h-screen py-8">
      {/* Banner Section */}
      <div className="container d-flex justify-content-center align-items-center flex-column mb-4" style={{ marginTop: '20px' }}>
        <div className="flex items-center gap-3 mb-4">
          <select
            className="p-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 font-medium shadow-sm hover:bg-gray-200 transition-colors"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search for products..."
            className="flex-grow p-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="button"
            className="p-2 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-all"
            onClick={() => console.log('Search triggered')}
          >
            Search
          </button>
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center gap-3 mt-4">
          <label htmlFor="price-range" className="block text-sm font-medium text-gray-900">
            Min Price: Rs {minPrice}
          </label>
          <input
            id="price-range"
            type="range"
            min="0"
            max="500000"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />

          <label htmlFor="price-range-max" className="block text-sm font-medium text-gray-900">
            Max Price: Rs {maxPrice}
          </label>
          <input
            id="price-range-max"
            type="range"
            min="0"
            max="500000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
      {/* Product Grid */}
      <div className="container">
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card product-card shadow-sm rounded-lg overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: '220px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  }}
                />
                <div className="card-body p-3">
                  <h6 className="card-title" style={{
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    maxWidth: '100%'
                  }}>
                    {product.name}
                  </h6>
                  <p className="card-text" style={{ fontSize: '0.9rem', color: '#666' }}>
                    {product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="card-text" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                      Rs {product.price}
                    </p>
                  </div>
                  <div className="d-flex gap-2 justify-content-between">
                    <a
                      href={product.darazLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-50 d-flex align-items-center justify-content-center text-center gap-2"
                      style={{
                        fontSize: '0.9rem',
                        borderRadius: '8px',
                        backgroundColor: '#ff8c00',
                        color: '#fff',
                        whiteSpace: 'nowrap',  // Prevents text wrapping
                        padding: '8px 10px',  
                      }}
                    >
                      Buy 
                    </a>
                    <button
                      className="btn btn-secondary w-50 d-flex align-items-center justify-content-center text-center gap-2"
                      style={{
                        fontSize: '0.9rem',
                        borderRadius: '8px',
                        backgroundColor: '#333',
                        color: '#fff',
                        whiteSpace: 'nowrap',  // Prevents text wrapping
                        padding: '8px 10px',  
                      }}
                      onClick={() => handleShareClick(product.shareLink)}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Share Modal */}
      {showShareModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Share Product</h4>
            <div className="d-flex justify-content-around">
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={32} color="#25D366" />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer">
                <FaFacebook size={32} color="#4267B2" />
              </a>
              <a href={`https://www.instagram.com/?url=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer">
                <FaInstagram size={32} color="#E1306C" />
              </a>
            </div>
            <button onClick={closeShareModal} className="btn btn-danger mt-4 w-100">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
