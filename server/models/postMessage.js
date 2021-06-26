import mongoose from "mongoose";

// this is structure of a post
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// this is model used to perform various operation in DB 
const postMessage = mongoose.model("postMessage", postSchema);

export default postMessage;
