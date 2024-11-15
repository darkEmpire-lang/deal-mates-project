import React, { useState, useEffect } from 'react';

const UpdateProduct = ({ product, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    darazLink: '',
    imageUrl: '',
  });

  useEffect(() => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      darazLink: product.darazLink,
      imageUrl: product.imageUrl || '',
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/products/update/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onUpdateSuccess();
      } else {
        alert('Error updating product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Daraz Link</label>
        <input
          type="text"
          name="darazLink"
          value={formData.darazLink}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Product
      </button>
    </form>
  );
};

export default UpdateProduct;
