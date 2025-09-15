const express = require("express");
const router = express.Router();
const Order = require("../models/orders.models");

// Save order data
router.post("/order-data", async (req, res) => {
  try {
    let { order_data, email, order_date } = req.body;

    if (!order_data || !email) {
      return res.status(400).json({ success: false, error: "Missing order data or email" });
    }

    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // Create new order
      await Order.create({
        email,
        order_data, // ✅ already an array
        order_date,
      });
      return res.json({ success: true, message: "New order created" });
    } else {
      // Update existing order by pushing new items
      existingOrder.order_data.push(...order_data); // ✅ spread, not nested
      existingOrder.order_date = order_date;
      await existingOrder.save();

      return res.json({ success: true, message: "Order updated" });
    }
  } catch (error) {
    console.error("Error saving order:", error.message);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;
