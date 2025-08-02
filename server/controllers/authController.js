const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const user = await User.create({ name, email, password, bio });

    req.session.userId = user._id;
    res.status(201).json({ msg: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid password" });

    req.session.userId = user._id;
    res.json({ msg: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ msg: "Logged out successfully" });
  });
};

exports.getUserProfile = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ msg: "Unauthorized" });

  const user = await User.findById(req.session.userId).select("-password");
  res.json(user);
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
