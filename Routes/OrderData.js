const express = require("express");
const router = express.Router();

const { Category, FoodItem } = require("../models/food.models");

router.post("/order-data", async (req, res) => {
  let data = req.body.order.data;
  await data.splice(0, 0, { Order_data });

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
