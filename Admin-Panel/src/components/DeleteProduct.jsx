import React from 'react';

const DeleteProduct = ({ productId, onClose }) => {
  const handleDeleteProduct = async () => {
    try {
      await fetch(`https://deal-mates-project-backend.vercel.app/delete/${productId}`, {
        method: 'DELETE',
      });
      alert('Product deleted successfully');
      onClose();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete this product?</p>
      <button onClick={handleDeleteProduct}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
};

export default DeleteProduct;
