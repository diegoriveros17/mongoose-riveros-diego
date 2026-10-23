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

export const articleRouter = Router();

articleRouter.post("/articles", createArticle);

articleRouter.get("/articles", getAllArticles);

articleRouter.get("/articles/:id", getArticleById);

articleRouter.put("/articles/:id", updateArticle);

articleRouter.delete("/articles/:id", deleteArticle);

articleRouter.post("/articles-tags", addTagToArticle);

articleRouter.delete("/articles-tags/:articleTagId", removeTagFromArticle);
