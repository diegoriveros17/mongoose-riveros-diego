import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from "../controllers/article.controller.js";
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/articles_tags.controller.js";
import {
  createArticleValidation,
  updateArticleValidation,
  validateArticleId,
  validateArticleTagId,
} from "../middlewares/validations/articleMiddleware.validation.js";
import { validate } from "../middlewares/validate.js";

export const articleRouter = Router();

articleRouter.post(
  "/articles",
  createArticleValidation,
  validate,
  createArticle,
);

articleRouter.get("/articles", getAllArticles);

articleRouter.get("/articles/:id", validateArticleId, validate, getArticleById);

articleRouter.put(
  "/articles/:id",
  updateArticleValidation,
  validate,
  updateArticle,
);

articleRouter.delete(
  "/articles/:id",
  validateArticleId,
  validate,
  deleteArticle,
);

articleRouter.get(
  "/articles-tags/:article_id/:tag_id",
  validateArticleTagId,
  validate,
  addTagToArticle,
);

articleRouter.delete(
  "/articles-tags/:articleTagId",
  validateArticleTagId,
  validate,
  removeTagFromArticle,
);
