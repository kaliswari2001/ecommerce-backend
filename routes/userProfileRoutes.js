const express = require("express");
const router = express.Router();

const {
    getProfile,
    updateProfile,
    deleteProfile
} = require("../controllers/userProfile");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.delete("/", protect, deleteProfile);

module.exports = router;