import { ArticleModel } from "../models/article.model.js";
import { matchedData } from "express-validator";

export const addTagToArticle = async (req, res) => {
  try {
    const { article_id, tag_id } = matchedData(req, { locations: ["params"] });

    const tagExist = await ArticleModel.findOne({
      _id: article_id,
      tags: tag_id,
    });

    if (tagExist) {
      return res.status(409).json({
        msg: "El artículo ya tiene asignada esta etiqueta",
      });
    }

    const articleWithTags = await ArticleModel.findByIdAndUpdate(
      article_id,
      { $addToSet: { tags: tag_id } },
      { returnDocument: "after" },
    ).populate("tags");

    return res.status(201).json({
      msg: "Etiqueta agregada al artículo correctamente",
      article: articleWithTags,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};

export const removeTagFromArticle = async (req, res) => {
  try {
    const { article_id, tag_id } = matchedData(req, { locations: ["params"] });

    await ArticleModel.findByIdAndUpdate(article_id, {
      $pull: { tags: tag_id },
    });

    return res.status(200).json({
      msg: "Etiqueta quitada del artículo correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};
