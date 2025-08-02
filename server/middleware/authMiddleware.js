const User = require("../models/UserModel");

exports.protect = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  const user = await User.findById(req.session.userId).select("-password");
  if (!user) {
    return res.status(401).json({ msg: "User not found" });
  }
  req.user = user; // <-- Set the user object
  next();
};
