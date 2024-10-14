const Admin = require("../models/Admin");
const mongoose = require("mongoose");

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: `Admin with email ${email} already exists` });
    }

    const admin = await Admin.create({ email });

    return res.status(201).json(admin);
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Delete admin by email
exports.deleteAdmin = async (req, res) => {
  try {
    const { email } = req.params; // Get the email from the request parameters

    const admin = await Admin.findOneAndDelete({ email }); // Use findOneAndDelete with email

    if (!admin) {
      return res
        .status(404)
        .json({ message: "No admin found with this email" });
    }

    res.json({ message: "Admin deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
