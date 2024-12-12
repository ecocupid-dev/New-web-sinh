import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  Title: {
    type: String,
    unique: true,
    required: true,
  },
  Image: {
    type: String, 
  },
  Description: {
    type: String,
  },
  IsPublish: {
    type: Boolean,
    required: true
  },
  CountryId: {
    type: Number,
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

ProjectSchema.index({ Title: 1 });

export const ProjectModel = mongoose.models.Projects || mongoose.model("Projects", ProjectSchema)


