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
  email: { type: String, required: true }, // Remove unique: true if it exists
  order_data: { type: Array, required: true },
  final_price: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["COD", "UPI", "Card"], required: true },
  address: {
    fullName: String,
    mobile: String,
    house: String,
    area: String,
    town: String,
    pincode: String,
    state: String,
    isDefault: Boolean,
  },
  order_date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Order", OrderSchema);