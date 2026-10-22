import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, status, user_id } = req.body;

    const id = user_id;

    const article = await ArticleModel.create({
      title,
      content,
      excerpt,
      status,
      user: id,
    });

    const articleWithAuthor = await ArticleModel.findById(id).populate("user");

    return res.status(201).json({
      message: "Artículo creado correctamente",
      article: articleWithAuthor,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};
