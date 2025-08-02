const Post = require("../models/PostModel");

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ content: req.body.content, author: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name bio")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: "Post not found" });

  // Remove from dislikes if present
  post.dislikes = post.dislikes.filter(
    (uid) => uid.toString() !== req.user._id.toString()
  );
  // Add to likes if not present
  if (!post.likes.includes(req.user._id)) {
    post.likes.push(req.user._id);
  }
  await post.save();
  res.json({ likes: post.likes.length, dislikes: post.dislikes.length });
};

exports.dislikePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: "Post not found" });

  // Remove from likes if present
  post.likes = post.likes.filter(
    (uid) => uid.toString() !== req.user._id.toString()
  );
  // Add to dislikes if not present
  if (!post.dislikes.includes(req.user._id)) {
    post.dislikes.push(req.user._id);
  }
  await post.save();
  res.json({ likes: post.likes.length, dislikes: post.dislikes.length });
};
