const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
    enum: ["Biryani/Rice", "Starter", "Pizza"],
  },
});

const FoodItemSchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    img: { type: String, required: true },
    options: [
      {
        _id: false,
        half: { type: String },
        full: { type: String },
        regular: { type: String },
        medium: { type: String },
        large: { type: String },
      },
    ],
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
const FoodItem = mongoose.model("FoodItem", FoodItemSchema);

module.exports = { Category, FoodItem };
