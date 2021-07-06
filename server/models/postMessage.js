import mongoose from "mongoose";

// this is structure of a post
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name:String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// this is model used to perform various operation in DB
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
