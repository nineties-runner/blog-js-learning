import CommentModel from "../models/Comment.js";

export default async (req, res, next) => {
  const postId = req.params.id;
  const comments = await CommentModel.find({ post: postId });

  if (comments) {
    try {
      req.body.comments = comments;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }
  } else {
    return res.status(403).json({
      message: "Access denied.",
    });
  }
};
