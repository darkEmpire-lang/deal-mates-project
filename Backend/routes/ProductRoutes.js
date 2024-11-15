const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create product - POST http://localhost:5000/product/add
router.post("/add", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json({ message: "Product Added" });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ error: "Error occurred while adding product" });
    }
});

// Read all products - GET http://localhost:5000/product/
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Error occurred while fetching products" });
    }
});

// Update product - PUT http://localhost:5000/product/update/:id
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Product Updated", product: updatedProduct });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ error: "Error occurred while updating product" });
    }
});

// Delete product - DELETE http://localhost:5000/product/delete/:id
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product Deleted" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ error: "Error occurred while deleting product" });
    }
});

// Get product by ID - GET http://localhost:5000/product/get/:id
router.get("/get/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (product) {
            res.status(200).json({ message: "Product Fetched", product });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ error: "Error occurred while fetching product" });
    }
});

module.exports = router;
