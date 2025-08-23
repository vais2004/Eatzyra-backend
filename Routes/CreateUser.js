const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/createuser", async (req, res) => {
  try {
    await User.create({
      name: "Radhika",
      password: "123456",
      email: "radhika@hotmail.com",
      location: "abc road, pqrs city, lmnop dist.",
    })
    res.json({success:true})
  } catch (error) {
    console.log(error);
     res.json({success:false})
  }
});

module.exports= router