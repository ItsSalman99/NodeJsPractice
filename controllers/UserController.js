const { response } = require("express");
const UserModel = require("../models/User");
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      status: true,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.storeNewUser = async (req, res) => {
  // Ensure req.body exists and contains the necessary fields

  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
      status: false,
      message:
        "name, email, and password are required fields in the request body.",
    });
  }

  // Extract fields from req.body
  const { name, email, password } = req.body;

  // Create a new user instance
  const user = new User({
    name,
    email,
    password,
  });

  try {
    const newUser = await user.save();

    return res.status(200).json({
      status: true,
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  console.log(req.query.user_id);
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({
      status: false,
      message: "user id is required field in the parameters.",
    });
  }

  try {
    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(500).json({
        status: false,
        message: "User not found, Invalid ID!",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User Deleted Succesfully",
      data: deleteUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
