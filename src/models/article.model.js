import { model, Schema, Types } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    excerpt: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enun: ["published", "archived"],
      required: false,
      default: "published",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const ArticleModel = model("Article", articleSchema);
