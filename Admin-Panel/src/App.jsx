// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';
import Header from './components/Header';
import Footer from './components/Footer';
import AllProducts from './components/AllProducts';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/all-product" element={<ProductList />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} /> {/* Update with ID parameter */}
        <Route path="/delete-product/:id" element={<DeleteProduct />} /> {/* Delete with ID parameter */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
