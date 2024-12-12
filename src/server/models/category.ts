import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  Name: {
    type: String,
    unique: true,
    required: true,
  },
  IsFeature: {
    type: Boolean,
    required: true,
  },
  Color: {
    type: String,
  },
  IsPublish: {
    type: Boolean,
    required: true,
  },
  Code: {
    type: String,
    unique: true,
  },
  Description: {
    type: String,
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

export const CategoryModel =
  mongoose.models.Categories || mongoose.model("Categories", CategorySchema);
