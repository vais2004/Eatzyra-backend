const express = require("express");
const router = express.Router();
const Order = require("../models/orders.models"); // make sure path matches file name

// Save order data
router.post("/order-data", async (req, res) => {
  try {
    let { order_data, email, order_date } = req.body;

    // Check if order exists for this email
    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // Create new order
      await Order.create({
        email,
        order_data: [order_data],
        order_date,
      });
      return res.json({ success: true, message: "New order created" });
    } else {
      // Update existing order by pushing new data
      existingOrder.order_data.push(order_data);
      existingOrder.order_date = order_date; // update latest order date
      await existingOrder.save();

      return res.json({ success: true, message: "Order updated" });
    }
  } catch (error) {
    console.error("Error saving order:", error.message);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;
