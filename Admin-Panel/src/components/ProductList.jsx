import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { MdEdit, MdDelete, MdVisibility, MdAdd } from 'react-icons/md';  // Import MdAdd
import UpdateProduct from './UpdateProduct';
import AddProduct from './AddProduct';  // Import AddProduct component (you need to create this)

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);  // State for Add Product Modal
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);  // State for Add Success

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/products'); // Update this URL if needed
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle product update
  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  // Handle product deletion with confirmation
  const handleDelete = async (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://e-commerce-one-livid-92.vercel.app/products/delete/${productId}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            // Product deleted successfully
            Swal.fire({
              title: 'Deleted!',
              text: 'Product has been deleted successfully.',
              icon: 'success',
            }).then(() => fetchProducts()); // Refresh the product list
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'There was an error deleting the product.',
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error deleting product:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred. Please try again.',
            icon: 'error',
          });
        }
      }
    });
  };

  // Calculate the total number of products
  const totalProducts = products.length;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#fff' }}>Product List</h2>

      <div className="mb-3 text-right">
        <h5 style={{ color: '#ff5722' }}>Total Products: <span style={{ color: '#4caf50' }}>{totalProducts}</span></h5>
      </div>

      {/* Plus Icon Button to Open Add Product Modal */}
      <div className="mb-3 text-right">
        <button
          className="btn btn-primary"
          style={{
            fontSize: '20px',
            padding: '8px 15px',
            borderRadius: '0', // Remove rounded corners
          }}
          onClick={() => setShowAddModal(true)}
        >
          <MdAdd style={{ color: '#fff' }} />
        </button>
      </div>

      <div className="table-responsive" style={{ maxHeight: '500px' }}>
        <table className="table table-bordered" style={{ backgroundColor: '#333', color: '#fff' }}>
          <thead style={{ backgroundColor: '#212121', color: '#fff' }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Daraz Link</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} style={{ backgroundColor: '#424242' }}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                  <a href={product.darazLink} target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>
                    View
                  </a>
                </td>
                <td>
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => handleUpdate(product)}
                      className="btn btn-dark btn-sm mr-3"
                      style={{
                        padding: '8px 12px',
                        border: 'none',
                        backgroundColor: '#607d8b',
                        position: 'relative',
                      }}
                    >
                      <MdEdit style={{ color: '#fff', fontSize: '18px' }} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-dark btn-sm mr-3"
                      style={{
                        padding: '8px 12px',
                        border: 'none',
                        backgroundColor: '#f44336',
                        position: 'relative',
                      }}
                    >
                      <MdDelete style={{ color: '#fff', fontSize: '18px' }} />
                    </button>
                    <button
                      className="btn btn-dark btn-sm"
                      style={{
                        padding: '8px 12px',
                        border: 'none',
                        backgroundColor: '#3f51b5',
                        position: 'relative',
                      }}
                    >
                      <MdVisibility style={{ color: '#fff', fontSize: '18px' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Product Modal */}
      {showUpdateModal && selectedProduct && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            paddingRight: '17px',
            backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '1050',
          }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{
              maxWidth: '800px', // Minimized width for the modal
              margin: 'auto', // Center the modal
              height: 'auto', // Adjust the height based on content
            }}
          >
            <div className="modal-content" style={{ backgroundColor: '#f4f4f9', maxHeight: '600px' }}>
              <div className="modal-header" style={{ backgroundColor: '#e3f2fd', color: '#000' }}>
                <h5 className="modal-title">Update Product</h5>
                <button type="button" className="close" onClick={() => setShowUpdateModal(false)} style={{ color: '#d32f2f' }}>
                  &times;
                </button>
              </div>
              <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <UpdateProduct
                  product={selectedProduct}
                  onClose={() => setShowUpdateModal(false)}
                  onUpdateSuccess={() => {
                    setUpdateSuccess(true);
                    fetchProducts(); // Refresh products after update
                    setShowUpdateModal(false); // Close modal
                    setTimeout(() => setUpdateSuccess(false), 3000); // Hide success message after 3 seconds
                  }}
                />
                {updateSuccess && (
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '10px',
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      textAlign: 'center',
                      borderRadius: '5px',
                    }}
                  >
                    Product updated successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            paddingRight: '17px',
            backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '1050',
          }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{
              maxWidth: '800px', // Minimized width for the modal
              margin: 'auto', // Center the modal
              height: '900px', // Adjust the height based on content
            }}
          >
            <div className="modal-content" style={{ backgroundColor: '#f4f4f9', maxHeight: '760px' }}>
              <div className="modal-header" style={{ backgroundColor: '#e3f2fd', color: '#000' }}>
                <h5 className="modal-title">Add Product</h5>
                <button type="button" className="close" onClick={() => setShowAddModal(false)} style={{ color: '#d32f2f' }}>
                  &times;
                </button>
              </div>
              <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <AddProduct
                  onClose={() => setShowAddModal(false)}
                  onAddSuccess={() => {
                    setAddSuccess(true);
                    fetchProducts(); // Refresh products after adding
                    setShowAddModal(false); // Close modal
                    setTimeout(() => setAddSuccess(false), 3000); // Hide success message after 3 seconds
                  }}
                />
                {addSuccess && (
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '10px',
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      textAlign: 'center',
                      borderRadius: '5px',
                    }}
                  >
                    Product added successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
