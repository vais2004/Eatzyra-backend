const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  house: { type: String, required: true },
  area: { type: String, required: true },
  town: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

module.exports = mongoose.model("Address", AddressSchema);
