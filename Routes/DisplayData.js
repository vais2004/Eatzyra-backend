const express = require("express");
const router = express.Router();
const { Category, FoodItem } = require("../models/food.models");

router.get("/food-data", async (req, res) => {
  try {
    const foodItems = await FoodItem.find({}) || [];
    const categories = await Category.find({}) || [];
    res.json({ foodItems, categories });
  } catch (err) {
    console.error("Error fetching food data:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
