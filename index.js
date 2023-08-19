import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { getMe, login, register } from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import * as CommentController from "./controllers/CommentControlles.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
mongoose
  .connect("mongodb+srv://admin:vvvvvv@cluster.pnayixb.mongodb.net/blog")
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => console.log("DB Error", err));
const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.use(express.json()); // позволяет читать json который к нам приходит (req)
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.post("/auth/login", loginValidation, handleValidationErrors, login);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.get("/tags", PostController.getLastTags);
app.get("/comments", CommentController.getAllComments);
app.get("/auth/me", checkAuth, getMe);
app.get("/posts", PostController.getAll);
app.get("/posts/rating", PostController.getTopRating);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.post(
  "/comments",
  checkAuth,
  handleValidationErrors,
  CommentController.createComment
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server ok");
});
