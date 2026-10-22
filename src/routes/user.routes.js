import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/users", getAllUsers);

userRouter.get("/users/:id", getUserById);

userRouter.post("/users", insertUser);

userRouter.put("/users/:id", updateUser);

userRouter.delete("/users/:id", deleteUser);
