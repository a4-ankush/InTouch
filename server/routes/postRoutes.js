const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
  dislikePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPost);
router.get("/", getAllPosts);
router.get("/user/:id", getUserPosts);

// Like and Dislike routes
router.post("/:id/like", protect, likePost);
router.post("/:id/dislike", protect, dislikePost);

module.exports = router;
