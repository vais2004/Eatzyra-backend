const express = require("express");
const router = express.Router();

const { Category, FoodItem } = require("../models/food.models");

router.post("/food-data", async (req, res) => {
  try {
    const foodItems = await FoodItem.find({});
    const categories = await Category.find({});

    res.json({
      foodItems,
      categories,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
