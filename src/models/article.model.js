import { model, Schema, Types } from "mongoose";

const articleSchema = new Schema({
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
    required: true,
  },
  status: {
    type: String,
    enun: ["published", "archived"],
    required: false,
    default: "published",
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ArticleModel = model("Article", articleSchema);
