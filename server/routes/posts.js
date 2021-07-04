import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/posts.js";

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
// @route PUT /posts/:id
// @access public
router.patch("/:id", updatePost);

export default router;
