import { model, Schema } from "mongoose";

const profileSchema = new Schema(
  {
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
  {
    _id: false,
  },
);

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
      type: profileSchema,
      required: true,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

export const UserModel = model("User", userSchema);
