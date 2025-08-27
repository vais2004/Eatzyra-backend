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

app.get("/api/fooditems", async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching food items", error: err });
  }
});

app.use("/api", require("./Routes/CreateUser"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
