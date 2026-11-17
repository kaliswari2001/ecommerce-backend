const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authenticationRoutes");

app.use("/api/auth", authRoutes);
app.get("/test", (req, res) => {
    res.send("API Working");
});
const profileRoutes = require("./routes/userProfileRoutes");

app.use("/api/profile", profileRoutes);
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);
const analyticsRoutes = require("./routes/analyticsRoutes");
app.use("/api/analytics", analyticsRoutes);
const errorHandler = require("./middleware/errorHandler");
// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("E-Commerce Backend Server Running");
});

const PORT = process.env.PORT || 3000;

const connectDB = require("./config/dbconnection");

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server Error:", error.message);
    }
};

startServer();