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

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    post,
    { new: true }
  );

  res.json(updatedPost);
};
