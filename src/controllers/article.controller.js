import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const createArticle = async (req, res) => {
  try {
    const { title, content, user_id } = matchedData(req, {
      locations: ["body"],
    });

    const article = await ArticleModel.create({
      title,
      content,
      author: user_id,
    });

    const articleWithAuthor = await ArticleModel.findById(article.id).populate(
      "author",
    );

    return res.status(201).json({
      msg: "Artículo creado correctamente",
      article: articleWithAuthor,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find()
      .populate("author")
      .populate("tags");

    return res.status(200).json({
      msg: "Artículos",
      data: articles,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const article = await ArticleModel.findById(id)
      .populate("author")
      .populate("tags");

    return res.status(200).json({
      msg: "Artículo obtenido correctamente",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const data = matchedData(req, { locations: ["body"] });

    const article = await ArticleModel.findById(id);

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after" },
    );

    const articleWithAuthor = await ArticleModel.findById(
      updatedArticle.id,
    ).populate("author");

    return res.status(200).json({
      msg: "Artículo actualizado correctamente",
      article: articleWithAuthor,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const deletedArticle = await ArticleModel.findByIdAndDelete(id);

    return res.status(200).json({
      msg: "Artículo eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};
