const express = require("express");
const router = express.Router();

// Import models
const { Order } = require("../models/orders.models");
// Save order data
router.post("/order-data", async (req, res) => {
  try {
    let data = req.body.order_data; // corrected from req.body.order.data
    let email = req.body.email;

    // Check if order exists for this email
    let existingOrder = await Order.findOne({ email: email });

    if (!existingOrder) {
      // Create new order
      await Order.create({
        email: email,
        order_data: [data],
      });
      return res.json({ success: true, message: "New order created" });
    } else {
      // Update existing order by pushing new data
      existingOrder.order_data.push(data);
      await existingOrder.save();
      return res.json({ success: true, message: "Order updated" });
    }
  } catch (error) {
    console.error("Error saving order:", error.message);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;
