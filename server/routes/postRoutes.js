import express from "express";
import {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/postControllers.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc  Get all posts
// @route GET /posts
// @access public
router.get("/", getPosts);

// @desc  create post
// @route POST /posts
// @access Private
router.post("/", auth, createPost);

// @desc  Get searched posts
// @route GET /posts/search?searchQuery="value"
// @access public
router.get("/search", getPostsBySearch);

// @desc  Get single posts
// @route GET /posts
// @access public
router.get("/:id", getPost);


// @desc  update post
// @route PATCH /posts/:id
// @access Private
router.patch("/:id", auth, updatePost);

// @desc  delete post
// @route DELETE /posts/:id
// @access Private
router.delete("/:id", auth, deletePost);

// @desc  liking post
// @route PATCH /posts/:id/likePost
// @access Private
router.patch("/:id/likePost", auth, likePost);

// @desc  commenting post
// @route POST /posts/:id/commentPost
// @access Private
router.post("/:id/commentPost", auth, commentPost);


export default router;
