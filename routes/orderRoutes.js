const express = require("express");
const router = express.Router();

const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// CREATE ORDER
router.post("/", protect, createOrder);

// GET ALL ORDERS
router.get("/", protect, getOrders);

// GET SINGLE ORDER
router.get("/:id", protect, getOrderById);

// UPDATE ORDER
router.put("/:id", protect, updateOrder);

// DELETE ORDER
router.delete("/:id", protect, deleteOrder);

module.exports = router;