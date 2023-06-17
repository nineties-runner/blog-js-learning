import { body } from "express-validator";

export const registerValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
];

export const loginValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const postCreateValidator = [
  body("title").isLength({ min: 3 }).isString(),
  body("text").isLength({ min: 10 }).isString(),
  body("tags").optional().isArray(),
  body("imageUrl").optional().isString(),
];

export const commentCreateValidator = [
  body("text").isLength({ min: 2 }).isString(),
];
