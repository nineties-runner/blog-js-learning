import * as CommentController from "./controllers/CommentController.js";
import * as PostController from "./controllers/PostController.js";
import * as UserController from "./controllers/UserController.js";

import {
  commentCreateValidator,
  loginValidator,
  postCreateValidator,
  registerValidator,
} from "./validations/validation.js";

import Post from "./models/Post.js";
import checkAuth from "./utils/checkAuth.js";
import cors from "cors";
import express from "express";
import fs from "fs";
import getComments from "./utils/getComments.js";
import handleErrors from "./utils/handleErrors.js";
import mongoose from "mongoose";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://root:RquHbKnKaOH8lT09@backend-learning.mhdopvc.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(console.log("Database online."))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post(
  "/auth/register",
  registerValidator,
  handleErrors,
  UserController.register
);

app.post("/auth/login", loginValidator, handleErrors, UserController.login);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", getComments, PostController.getOne);
app.post(
  "/posts",
  postCreateValidator,
  handleErrors,
  checkAuth,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidator,
  handleErrors,
  PostController.update
);

app.post(
  "/comments/:id",
  commentCreateValidator,
  handleErrors,
  checkAuth,
  CommentController.create
);
app.get("/comments/", CommentController.getAll);
app.get("/comments/:id", CommentController.getPost);
app.delete("/comments/", checkAuth, CommentController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server online.");
});
