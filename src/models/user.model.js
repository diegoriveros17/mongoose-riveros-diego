import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    profile: {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      biography: {
        type: String,
        required: false,
      },
      birth_date: {
        type: Date,
        required: false,
      },
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

userSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});

export const UserModel = model("User", userSchema);
