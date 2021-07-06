import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
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

export default router;
