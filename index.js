const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const { initializeDatabase } = require("./db/db.connect");

const { Category, FoodItem } = require("./models/food.models");

app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// app.get("/api/food-data", async (req, res) => {
//   try {
//     const foodItems = await FoodItem.find();
//     res.status(200).json(foodItems);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching food items", error: err });
//   }
// });

app.get("/api/food-data", async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    const categories = await Category.find(); // Add this line
    
    res.status(200).json({
      foodItems: foodItems,
      categories: categories // Include categories in response
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching food items", error: err });
  }
});

app.get("/api/cleanup-options", async (req, res) => {
  try {
    await FoodItem.updateMany({}, { $unset: { "options.$[]->_id": "" } });
    res.json({ message: "✅ Cleaned up _id inside options" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error cleaning data", error: err });
  }
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
