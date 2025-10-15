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

router.get("/food-data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await FoodItem.findById(id);

    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    res.json(foodItem);
  } catch (err) {
    console.error("Error fetching food item:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
