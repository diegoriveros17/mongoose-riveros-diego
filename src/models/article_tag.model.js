import { model, Schema, Types } from "mongoose";

export const articleTagSchema = new Schema(
  {
    article: {
      type: Types.ObjectId,
      ref: "Article",
      required: true,
    },
    tag: {
      type: Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const ArticleTagModel = model("Article_Tag", articleTagSchema);
