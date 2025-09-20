const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
    enum: ["Biryani/Rice", "Starter", "Pizza"],
  },
});

const OptionSchema = new mongoose.Schema(
  {
    half: { type: String },
    full: { type: String },
    regular: { type: String },
    medium: { type: String },
    large: { type: String },
  },
  { _id: false }
);

const FoodItemSchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    img: { type: String, required: true },
    options: [OptionSchema],
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
const FoodItem = mongoose.model("FoodItem", FoodItemSchema);

module.exports = { Category, FoodItem };
