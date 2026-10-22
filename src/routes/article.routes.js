import { Router } from "express";
import { createArticle } from "../controllers/article.controller.js";

export const articleRouter = Router();

// Crear artículo. (usuario autenticado)
articleRouter.post("/articles", createArticle);
