const Product = require("../models/product");

// PRODUCT RECOMMENDATION
const getRecommendations = async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter)
            .sort({ stock: -1 })
            .limit(5);

        res.status(200).json({
            message: "Recommended Products",
            recommendations: products
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { getRecommendations };