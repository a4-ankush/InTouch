const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getUserPosts,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPost);
router.get("/", getAllPosts);
router.get("/user/:id", getUserPosts);

module.exports = router;
