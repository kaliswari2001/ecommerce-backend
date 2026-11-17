const Order = require("../models/order");

// CREATE ORDER
const createOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;

        const order = await Order.create({
            user: req.user.id,
            products,
            totalAmount
        });

        res.status(201).json({
            message: "Order created successfully",
            order
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET ALL ORDERS
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE ORDER
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE ORDER
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order updated successfully",
            order
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE ORDER
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};