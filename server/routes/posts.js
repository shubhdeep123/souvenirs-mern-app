import express from "express";
import { getPosts, createPost } from "../controllers/posts.js";

const router = express.Router();

// @desc  Get all posts
// @route GET /posts
// @access public
router.get("/", getPosts);

// @desc  create post
// @route POST /posts
// @access public
router.post("/", createPost);

export default router;
