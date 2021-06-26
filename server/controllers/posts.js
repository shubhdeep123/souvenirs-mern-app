import postMessage from "../models/postMessage.js";

// function to get all posts from DB
export const getPosts = async (req, res) => {
  try {
    const allPost = await postMessage.find();
    console.log(allPost);
    res.status(200).json(allPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// function to create a post in DB
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
