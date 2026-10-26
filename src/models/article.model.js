import { model, Schema, Types } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
      enum: ["published", "archived"],
      required: false,
      default: "published",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    versionKey: false,
  },
);

export const ArticleModel = model("Article", articleSchema);
