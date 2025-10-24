const express = require("express");
const router = express.Router();
const Address = require("../models/address.models");

router.post("/add-address", async (req, res) => {
  try {
    const {
      userEmail,
      fullName,
      mobile,
      house,
      area,
      town,
      pincode,
      state,
      isDefault,
    } = req.body;

    if (
      !userEmail ||
      !fullName ||
      !mobile ||
      !house ||
      !area ||
      !town ||
      !pincode
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    if (isDefault) {
      await Address.updateMany({ userEmail }, { $set: { isDefault: false } });
    }

    const newAddress = new Address({
      userEmail,
      fullName,
      mobile,
      house,
      area,
      town,
      pincode,
      state,
      isDefault,
    });

    await newAddress.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Address added successfully",
        address: newAddress,
      });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/get-addresses", async (req, res) => {
  try {
    const { userEmail } = req.body;
    if (!userEmail) {
      return res.status(400).json({ error: "email required" });
    }

    const addresses = await Address.find({ userEmail });
    res.json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete-address/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findByIdAndDelete(id);
    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/set-default", async (req, res) => {
  try {
    const { userEmail, id } = req.body;
    if (!userEmail || !id) {
      res.status(400).json({ error: "missing details" });
    }

    await Address.updateMany({ userEmail }, { $set: { isDefault: false } });
    await Address.findByIdAndUpdate(id, { isDefault: true });

    res.json({ message: "Default address updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
