const express = require("express");
const router = express.Router();
const Order = require("../models/orders.models");

// place new order
router.post("/order-data", async (req, res) => {
  try {
    const { email, order_data, final_price, paymentMethod, address } = req.body;

    if (!email || !order_data || !final_price || !paymentMethod || !address) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const newOrder = new Order({
      email,
      order_data,
      final_price,
      paymentMethod,
      address,
      order_date: new Date(),
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/my-order-data", async (req, res) => {
  try {
    //console.log("📩 Request body:", req.body);
    const { email } = req.body;
    //console.log("📧 Email received:", email);

    //console.log("Incoming email:", email); // ✅ Debug log

    if (!email) {
      return res.status(400).json({ success: false, error: "Email required" });
    }

    const myOrders = await Order.find({ email }).sort({ order_date: -1 });

    // console.log("Fetched Orders:", myOrders); // ✅ Debug log

    res.json({ success: true, orders: myOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
