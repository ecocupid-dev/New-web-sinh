import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WriterSchema = new Schema({
  UserName: {
    type: String,
    unique: true,
    required: true,
  },
  Avatar: {
    type: String,
  },
  LinkedIn: {
    type: String,
    unique: true,
  },
  IsPublish: {
    type: Boolean,
    required: true
  },
  Email: {
    type: String,
    unique: true,
  },
  Description: {
    type: String,
  },
  Created: {
    type: Date,
    default: Date.now()
  },
  CreatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  Updated: {
    type: Date,
  },
  UpdatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  }
})

export const WriterModel = mongoose.models.Writers || mongoose.model("Writers", WriterSchema)