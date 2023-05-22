import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.body.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post.",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Couldn't fetch data.",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: {
          viewsCount: 1,
        },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Couldn't fetch data.",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Couldn't find data.",
          });
        }

        res.json(doc);
      }
    ).populate("user");
  } catch (error) {
    res.status(500).json({
      message: "Couldn't fetch data.",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Couldn't delete data.",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Couldn't find data to delete.",
          });
        }

        res.json({ success: true });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Couldn't delete data.",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.body.userId,
      }
    ),
      res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Couldn't update data." });
  }
};
