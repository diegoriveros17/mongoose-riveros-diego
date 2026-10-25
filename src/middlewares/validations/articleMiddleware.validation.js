import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { UserModel } from "../../models/user.model.js";
import { TagModel } from "../../models/tag.model.js";

export const validateArticleId = [
  param("id")
    .notEmpty()
    .withMessage("El id del artículo es obligatorio")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (id) => {
      const article = await ArticleModel.findById(id);
      if (!article) {
        throw new Error("El artículo especificado no existe");
      }
      return true;
    }),
];

export const createArticleValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .custom(async (title) => {
      const articleTitle = await ArticleModel.findOne({ title });
      if (articleTitle) {
        throw new Error("Ya existe un articulo con este titulo");
      }
      return true;
    }),
  body("content").trim().notEmpty().withMessage("El contenido es obligatorio"),
  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Excerpt no puede superar los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado solo puede ser 'published' o 'archived'"),
  body("user_id")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (user_id) => {
      const user = await UserModel.findOne({
        _id: user_id,
        deleted: { $ne: true },
      });
      if (!user) {
        throw new Error(
          "El usuario con el que desea asociar el articulo no existe",
        );
      }
      return true;
    }),
];

export const updateArticleValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id del artículo es obligatorio")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (article_id) => {
      const article = await ArticleModel.findById(article_id);
      if (!article) {
        throw new Error("El artículo que intenta actualizar no existe");
      }
      return true;
    }),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .custom(async (title) => {
      const articleTitle = await UserModel.findOne({ title });
      if (articleTitle) {
        throw new Error("Ya existe un articulo con este titulo");
      }
      return true;
    }),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El contenido no puede estar vacío"),
  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Excerpt no puede superar los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado solo puede ser 'published' o 'archived'"),
];

// Article-Tag
export const validateArticleTagId = [
  param("article_id")
    .notEmpty()
    .withMessage("El id del artículo es obligatorio")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (article_id) => {
      const article = await ArticleModel.findById(article_id);
      if (!article) {
        throw new Error("El artículo especificado no existe");
      }
      return true;
    }),
  param("tag_id")
    .notEmpty()
    .withMessage("El id de la etiqueta es obligatorio")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (tag_id) => {
      const tag = await TagModel.findById(tag_id);
      if (!tag) {
        throw new Error("La etiqueta especificada no existe");
      }
      return true;
    }),
];
