// const express = require("express");
// const router = express.Router();
// const Order = require("../models/orders.models");

// router.post("/order-data", async (req, res) => {
//   try {
//     let { order_data, email, order_date } = req.body;

//     if (!order_data || !email) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Missing order data or email" });
//     }

//     let existingOrder = await Order.findOne({ email });

//     if (!existingOrder) {
//       // create new order
//       await Order.create({
//         email,
//         order_data: [[{ Order_date: order_date }, ...order_data]], // ✅ Capital O + nested array
//       });
//       return res.json({ success: true, message: "New order created" });
//     } else {
//       // update existing order by pushing new items
//       existingOrder.order_data.push([
//         { Order_date: order_date },
//         ...order_data,
//       ]); //  nested correctly
//       await existingOrder.save();

//       return res.json({ success: true, message: "Order updated" });
//     }
//   } catch (error) {
//     console.error("Error saving order:", error.message);
//     return res.status(500).json({ success: false, error: "Server Error" });
//   }
// });

// router.post("/my-order-data", async (req, res) => {
//   try {
//     let mydata = await Order.findOne({ email: req.body.email });

//     res.json({ orderData: mydata });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: "Server Error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Order = require("../models/orders.models");

// Place new order
router.post("/order-data", async (req, res) => {
  try {
    const { email, order_data, final_price, paymentMethod, address } = req.body;

    if (!email || !order_data || !final_price || !paymentMethod || !address) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
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
    res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fetch all orders of a user
router.post("/my-order-data", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email required" });
    }

    const myOrders = await Order.find({ email }).sort({ order_date: -1 });
    res.json({ success: true, orders: myOrders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;
