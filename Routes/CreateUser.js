const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

// router.post("/createuser", async (req, res) => {
//   try {
//     await User.create({
//       name: req.body.name,
//       password: req.body.password,
//       email: req.body.email,
//       location: req.body.location,
//     });
//     res.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false });
//   }
// });
router.post("/createuser", async (req, res) => {
  try {
    console.log("👉 Received body:", req.body); // 👈 debug here

    const newUser = await User.create(req.body);
    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    res.json({ success: false, error: error.message });
  }
});


module.exports = router;
