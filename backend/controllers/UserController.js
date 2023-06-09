import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "insert_secret_key_here",
      {
        expiresIn: "60d",
      }
    );

    const { passwordHash: hash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("Invalid credentials.");
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(404).json({
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "insert_secret_key_here",
      {
        expiresIn: "60d",
      }
    );

    const { passwordHash: hash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials.",
      });
    }
    const { passwordHash: hash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Failed to parse info.",
    });
  }
};
