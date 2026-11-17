const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/user");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const hashedPassword = await bcrypt.hash("Raja@1208", 10);

        await User.create({
            name: "raja",
            email: "raja@gmail.com",
            password:hashedPassword,
            role: "admin"
        });

        console.log("Admin account created successfully");
    } catch (error) {
        console.log(error.message);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();