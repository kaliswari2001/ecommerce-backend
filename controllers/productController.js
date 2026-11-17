const Product = require("../models/product");

/// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // CHECK REQUIRED FIELDS
        if (!name || !description || price === undefined || !category) {
            return res.status(400).json({
                message: "All required fields must be provided"
            });
        }

        // CHECK PRICE
        if (Number(price) <= 0 || isNaN(Number(price))) {
            return res.status(400).json({
                message: "Price must be a valid positive number"
            });
        }

        // CREATE PRODUCT
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
// GET ALL PRODUCTS WITH SEARCH, FILTER AND SORT
const getProducts = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice, sort } = req.query;

        let filter = {};

        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        let query = Product.find(filter);

        if (sort === "asc") {
            query = query.sort({ price: 1 });
        } else if (sort === "desc") {
            query = query.sort({ price: -1 });
        }

        const products = await query;

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};