import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [darazLink, setDarazLink] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");

    const [nameError, setNameError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [darazLinkError, setDarazLinkError] = useState("");
    const [imageUrlError, setImageUrlError] = useState("");
    const [categoryError, setCategoryError] = useState("");

    // Validation: Only allow letters and spaces for product name
    const handleNameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setName(value);
        if (!value) setNameError('Product name is required.');
        else setNameError('');
    };

    // Validation: Price can't be negative or zero
    function handlePriceChange(e) {
        const value = parseFloat(e.target.value);
        if (value <= 0) {
            setPriceError("Price must be greater than zero.");
        } else {
            setPriceError("");
        }
        setPrice(e.target.value);
    }

    // Validation: Only strings allowed for description
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        if (!e.target.value) setDescriptionError('Description is required.');
        else setDescriptionError('');
    };

    // Validation: Check if image URL is valid
    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
        const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/i;
        if (!urlPattern.test(e.target.value)) {
            setImageUrlError('Invalid image URL.');
        } else {
            setImageUrlError('');
        }
    };

    // Validation: Ensure category is selected
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        if (!e.target.value) setCategoryError('Category is required.');
        else setCategoryError('');
    };

    // Submit function with all validations
    function sendData(e) {
        e.preventDefault();

        if (
            nameError || priceError || descriptionError ||
            darazLinkError || imageUrlError || categoryError
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please correct the errors before submitting.',
                confirmButtonText: 'OK'
            });
            return; // Prevent submission if validation fails
        }

        const newProduct = {
            name,
            price: parseFloat(price),
            description,
            darazLink,
            imageUrl,
            category
        };

        axios.post("http://localhost:8000/products/add", newProduct)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    text: 'The product has been added successfully!',
                    confirmButtonText: 'OK'
                });

                // Reset form fields
                setName("");
                setPrice("");
                setDescription("");
                setDarazLink("");
                setImageUrl("");
                setCategory("");
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'An error occurred: ' + err.message,
                    confirmButtonText: 'OK'
                });
            });
    }

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 mt-3">
            <div className="row w-100">
                <div className="col-md-8 col-lg-6 col-xl-5 mx-auto">
                    <div className="card border-5 shadow rounded-4 bg-light bg-opacity-75">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4 position-relative">
                                <i className="bi bi-plus-circle icon-color me-2"></i>Add New Product
                                <div className="title-underline"></div>
                            </h3>

                            <form onSubmit={sendData}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label">
                                            <i className="bi bi-box icon-color me-2"></i>Product Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter Product Name"
                                            value={name}
                                            onChange={handleNameChange}
                                            required
                                        />
                                        {nameError && (
                                            <div className="text-danger mt-1">{nameError}</div>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="price" className="form-label">
                                            <i className="bi bi-cash icon-color me-2"></i>Price
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="price"
                                            placeholder="Enter Price"
                                            value={price}
                                            onChange={handlePriceChange}
                                            required
                                        />
                                        {priceError && (
                                            <div className="text-danger mt-1">{priceError}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                <div className="col-md-6">
    <label htmlFor="category" className="form-label">
        <i className="bi bi-tags icon-color me-2"></i>Category
    </label>
    <select
        className="form-select"
        id="category"
        value={category}
        onChange={handleCategoryChange}
        required
    >
        <option value="">Select Category</option>
        <option value="Mobile Phones">Mobile Phones</option>
        <option value="Apple Phones">Apple Phones</option>
        <option value="Clothes">Clothes</option>
        <option value="Pens">Pens</option>
        <option value="Pen Drives">Pen Drives</option>
        <option value="Hard Drives">Hard Drives</option>
        <option value="Mice">Mice</option>
        <option value="Keyboards">Keyboards</option>
        <option value="Stationery Items">Stationery Items</option>
        <option value="Earbuds">Earbuds</option>
        <option value="Headphones">Headphones</option>
        <option value="Laptops">Laptops</option>
        <option value="Tablets">Tablets</option>
        <option value="Smart Watches">Smart Watches</option>
        <option value="Chargers">Chargers</option>
        <option value="Cables">Cables</option>
        <option value="Speakers">Speakers</option>
        <option value="Camera Accessories">Camera Accessories</option>
        <option value="TVs">TVs</option>
        <option value="Home Appliances">Home Appliances</option>
    </select>
    {categoryError && (
        <div className="text-danger mt-1">{categoryError}</div>
    )}
</div>


                                    <div className="col-md-6">
                                        <label htmlFor="darazLink" className="form-label">
                                            <i className="bi bi-link icon-color me-2"></i>Daraz Link
                                        </label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            id="darazLink"
                                            placeholder="Enter Daraz Link"
                                            value={darazLink}
                                            onChange={(e) => setDarazLink(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="imageUrl" className="form-label">
                                            <i className="bi bi-image icon-color me-2"></i>Image URL
                                        </label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            id="imageUrl"
                                            placeholder="Enter Image URL"
                                            value={imageUrl}
                                            onChange={handleImageUrlChange}
                                            required
                                        />
                                        {imageUrlError && (
                                            <div className="text-danger mt-1">{imageUrlError}</div>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="description" className="form-label">
                                            <i className="bi bi-file-text icon-color me-2"></i>Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            placeholder="Enter Description"
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            required
                                        />
                                        {descriptionError && (
                                            <div className="text-danger mt-1">{descriptionError}</div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                    style={{
                                        backgroundColor: '#007BFF',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        borderRadius: '25px',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    Add Product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
