import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    const id = user_id;

    const article = await ArticleModel.create({
      title,
      content,
      author: id,
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
    const articles = await ArticleModel.find().populate("author");

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
    const { id } = req.params;

    const article = await ArticleModel.findById(id).populate("author");

    if (!article) {
      return res.status(404).json({
        msg: "El artículo solicitado no existe",
      });
    }

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
    const { id } = req.params;
    const data = req.body;

    const article = await ArticleModel.findById(id);

    if (!article) {
      return res.status(404).json({
        msg: "El artículo que intenta actualizar no existe",
      });
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      msg: "Artículo actualizado correctamente",
      article: updatedArticle,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await ArticleModel.findById(id);
    if (!article) {
      return res.status(404).json({
        msg: "El artículo que intenta eliminar no existe",
      });
    }

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
