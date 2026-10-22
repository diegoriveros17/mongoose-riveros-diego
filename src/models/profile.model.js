import { model, Schema } from "mongoose";

export const profileSchema = new Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  biography: {
    type: String,
    require: false,
  },
  birth_date: {
    type: Date,
    require: false,
  },
});

export const ProfileModel = model("Profile", profileSchema);
