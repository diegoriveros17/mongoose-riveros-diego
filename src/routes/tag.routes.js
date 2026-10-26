import { Router } from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag.controller.js";
import {
  createTagValidation,
  updateTagValidation,
  validateTagId,
} from "../middlewares/validations/tagMiddleware.validation.js";
import { validate } from "../middlewares/validate.js";

export const tagRouter = Router();

tagRouter.post("/tags", createTagValidation, validate, createTag);

tagRouter.get("/tags", getAllTags);

tagRouter.get("/tags/:id", validateTagId, validate, getTagById);

tagRouter.put(
  "/tags/:id",
  validateTagId,
  updateTagValidation,
  validate,
  updateTag,
);

tagRouter.delete("/tags/:id", validateTagId, validate, deleteTag);
