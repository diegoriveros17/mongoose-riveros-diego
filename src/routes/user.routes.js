import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../middlewares/validations/userMiddleware.validation.js";
import { validate } from "../middlewares/validate.js";

export const userRouter = Router();

userRouter.get("/users", getAllUsers);

userRouter.get("/users/:id", getUserById);

userRouter.post("/users", createUserValidation, validate, insertUser);

userRouter.put("/users/:id", updateUserValidation, validate, updateUser);

userRouter.delete("/users/:id", deleteUser);
