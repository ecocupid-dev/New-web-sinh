import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  UserName: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  RoleID: {
    type: Number,
    required: true,
  },
  Avatar: {
    type: String,
  },
  Description: {
    type: String,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  LinkedIn: {
    type: String,
    unique: true,
  },
  Created: {
    type: Date,
    default: Date.now(),
  },
  CreatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  Updated: {
    type: Date,
  },
  UpdatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

export const UserModel =
  mongoose.models.Users || mongoose.model("Users", UserSchema);
