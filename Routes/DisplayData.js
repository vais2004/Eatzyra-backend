const express = require("express");
const router = express.Router();

const { Category, FoodItem } = require("../models/food.models");

router.get("/food-data", async (req, res) => {
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

router.get("/food-data/:id", async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
      return res.status(404).json({ msg: "Food itemnot found" });
    }
    res.json(foodItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

module.exports = router;
