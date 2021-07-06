import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// function to get all posts from DB
export const getPosts = async (req, res) => {
  try {
    const allPost = await PostMessage.find();
    console.log(allPost);
    res.status(200).json(allPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// function to create a post in DB
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// function to update a post in DB
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).send("No post found");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

// function to delete a post in DB
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).send("Not a valid id");

  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "Post deleted successfully" });
};

// function to delete a post in DB
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).send("Not a valid id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like the post
    post.likes.push(req.UserId);
  } else {
    // dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
