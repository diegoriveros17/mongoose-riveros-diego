import { model, Schema } from "mongoose";

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  },
);

tagSchema.set("toJSON", { virtuals: true });
tagSchema.set("toObject", { virtuals: true });
tagSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "tags",
});
export const TagModel = model("Tag", tagSchema);
