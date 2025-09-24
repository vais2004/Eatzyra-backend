// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   order_data: { type: Array, required: true },
//   order_date: { type: String },
// });

// const Order = mongoose.model("Order", OrderSchema);

// module.exports = Order; 

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },

  // Food items ordered
  order_data: {
    type: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        size: { type: String },
        price: { type: Number, required: true },
        img: { type: String },
      },
    ],
    required: true,
  },

  order_date: { type: Date, default: Date.now },

  // Delivery address
  address: {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    house: { type: String, required: true },
    area: { type: String, required: true },
    town: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String },
  },

  // Payment & pricing
  final_price: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ["COD", "UPI", "Card"],
    required: true,
  },

  // Order tracking
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Out for Delivery", "Delivered", "Cancelled"],
    default: "Pending",
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
