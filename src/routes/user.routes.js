import { Router } from "express";
import { insertUser } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/users", insertUser);
