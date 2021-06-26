import express from "express";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

// this will allow us to access env variables
dotenv.config({ path: '../.env' })

// These are the middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// These are the api routes endpoint
app.use("/posts", postRoutes);

// here mongoDB is being connected
const CONNECTION_URL = process.env.MONGO_URI
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
