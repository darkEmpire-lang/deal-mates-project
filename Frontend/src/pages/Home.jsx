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
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [showPriceFilter, setShowPriceFilter] = useState(false);

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

  const togglePriceFilter = () => {
    setShowPriceFilter(!showPriceFilter);
  };

  const resetPriceFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setShowPriceFilter(false);
  };

  const filterProducts = () => {
    const filteredProducts = products.filter((product) => {
      const meetsCategory = category ? product.category === category : true;
      const meetsSearchTerm = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      const meetsPriceRange = product.price >= minPrice && product.price <= maxPrice;
  
      return meetsCategory && meetsSearchTerm && meetsPriceRange;
    });
  
    console.log('Filtered Products:', filteredProducts);
  };
  
  return (
    <div className="home-container bg-light min-h-screen py-8">
      {/* Banner Section */}
      <div className="banner-section mb-4" style={{ marginTop: '20px', width: '100%' }}>
        <div className="banner-item" style={{ height: '250px', overflow: 'hidden' }}>
          <div className="banner-slider">
            <div className="banner-slide">
              <img
                src={bannerImages[currentBannerIndex]}
                alt={`Banner ${currentBannerIndex + 1}`}
                className="w-100"
                style={{
                  height: '250px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease-in-out'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="container d-flex justify-content-center align-items-center flex-column mb-4 p-4 "
        style={{ marginTop: '20px', maxWidth: '1400px' }}
      >
        
        <div className="d-flex gap-3 w-100 mb-4 align-items-center">
          <select
            className="p-3 rounded-lg text-white shadow-md"
            style={{ minWidth: '150px', backgroundColor: '#ffa500' }}
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

          <div className="flex-grow d-flex position-relative" style={{ width: '100%' }}>
            <input
              type="text"
              placeholder="Search for products..."
              className="form-control p-3 rounded-lg shadow-sm"
              style={{ paddingRight: '50px', fontSize: '1.1rem', width: '100%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          
          </div>

          <button
            className="btn text-white"
            style={{
              backgroundColor: '#ffa500',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px',
            }}
            onClick={togglePriceFilter}
          >
            Price
          </button>
        </div>

        {/* Price Range Filter */}
        {showPriceFilter && (
          <div className="d-flex align-items-center gap-3 mb-4 w-100">
            <input
              type="number"
              placeholder="Min"
              className="form-control p-2 shadow-sm"
              style={{ width: '100px', borderRadius: '8px' }}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="form-control p-2 shadow-sm"
              style={{ width: '100px', borderRadius: '8px' }}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button
              className="btn text-white"
              style={{
                backgroundColor: '#ff8c00',
                fontWeight: 'bold',
                padding: '10px 20px',
                borderRadius: '8px',
              }}
              onClick={filterProducts}
            >
              Filter
            </button>



            <button
            className="btn text-white"
            style={{
              backgroundColor: '#ff8c00',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px',
            }}
            onClick={resetPriceFilter}
          >
            Reset
          </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="container">
            <div className="row">
              {filteredProducts.map((product) => (
            <div
        key={product._id}
        className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 d-flex justify-content-center"
          >
        <div
          className="card product-card shadow-sm border-0"
          style={{
            maxWidth: "220px",
            borderRadius: "10px",
            overflow: "hidden",
           
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="card-img-top"
            style={{
              height: "150px",
              objectFit: "cover",
            }}
          />
          <div className="card-body p-2">
            <h6
              className="card-title"
              style={{
                fontSize: "0.9rem",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.name}
            </h6>
            <p
              className="card-text text-muted"
              style={{
                fontSize: "0.8rem",
              }}
            >
              {product.description.length > 60
                ? product.description.slice(0, 60) + "..."
                : product.description}
            </p>
            <p
              className="card-text text-primary fw-bold mb-2"
              style={{ fontSize: "0.9rem" }}
            >
              Rs {product.price}
            </p>
            <div className="d-flex gap-2">
  <a
    href={product.darazLink}
    target="_blank"
    rel="noopener noreferrer"
    className="btn w-50"
    style={{
      backgroundColor: "#5A9", // Soothing green shade
      color: "#fff", // White text for contrast
      fontSize: "0.85rem", // Slightly smaller font for compactness
      height: "36px", // Reduced height
      borderRadius: "6px", // Smooth edges for a modern look
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FaShoppingCart className="me-1" />
    Buy
  </a>
  <button
    className="btn w-50"
    style={{
      backgroundColor: "#F8A", // Soft pink shade
      color: "#fff", // White text for readability
      fontSize: "0.85rem",
      height: "36px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    onClick={() => handleShareClick(product.darazLink)}
  >
    <FaShareAlt className="me-1" />
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
            <h4 className="modal-title">Share Product</h4>
            <p>Share this product with your friends:</p>
            <div className="share-links d-flex gap-3 justify-content-center mt-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-primary"
              >
                <FaFacebook size={32} />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${shareLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-success"
              >
                <FaWhatsapp size={32} />
              </a>
              <a
                href={`https://www.instagram.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-danger"
              >
                <FaInstagram size={32} />
              </a>
            </div>
            <button className="modal-close" onClick={closeShareModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;