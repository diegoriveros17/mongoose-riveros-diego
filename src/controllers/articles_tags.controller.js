import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";
import { ArticleTagModel } from "../models/article_tag.model.js";

export const addTagToArticle = async (req, res) => {
  try {
    const { article_id, tag_id } = req.body;

    const tagExist = await ArticleTagModel.findOne({ article_id, tag_id });

    if (tagExist) {
      return res.status(409).json({
        msg: "El artículo ya tiene asignada esta etiqueta",
      });
    }

    const newTag = await ArticleTagModel.create({
      article: article_id,
      tag: tag_id,
    });

    const articleWithTags = await ArticleTagModel.findById(newTag.id)
      .populate("article")
      .populate("tag");

    return res.status(201).json({
      msg: "Etiqueta agregada al artículo correctamente",
      articleTag: newTag,
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
    const { articleTagId } = req.params;

    const tagArticle = await ArticleTagModel.findById(articleTagId);

    if (!tagArticle) {
      return res.status(404).json({
        msg: "La relación entre el artículo y la etiqueta no existe",
      });
    }

    const deletedArticle = await ArticleModel.findByIdAndDelete(id);

    const deletedTag = await TagModel.findOneAndDelete({ user: id });

    return res.status(200).json({
      msg: "Etiqueta eliminada del artículo correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};
