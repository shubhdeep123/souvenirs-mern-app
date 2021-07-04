import express from "express";
import { getPosts, createPost, updatePost,deletePost } from "../controllers/posts.js";

const router = express.Router();

// @desc  Get all posts
// @route GET /posts
// @access public
router.get("/", getPosts);

// @desc  create post
// @route POST /posts
// @access public
router.post("/", createPost);

// @desc  update post
// @route PATCH /posts/:id
// @access public
router.patch("/:id", updatePost);

// @desc  delete post
// @route DELETE /posts/:id
// @access public
router.delete("/:id", deletePost);

export default router;
