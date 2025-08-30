const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "thisIsMyJwtSecretKey123456";

router.post("/createuser", async (req, res) => {
  try {
    console.log("👉 Received body:", req.body);

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    // Save user with hashed password
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword, // save hashed password
      location: req.body.location,
    });

    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    res.json({ success: false, error: error.message });
  }
});

router.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;

  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ error: "Try logging with correct email" });
    }

    // ✅ Correct password comparison
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const data = {
      user: {
        id: userData.id,
      },
    };

    const authToken = jwt.sign(data, jwtSecret);

    res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.error("❌ Error logging in:", error.message);
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;
