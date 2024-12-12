import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  Title: {
    type: String,
    unique: true,
    required: true,
  },
  IsFeature: {
    type: Boolean,
    required: true,
  },
  Thumnail: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
  },
  Summary: {
    type: String,
  },
  ProjectId: {
    type: Schema.Types.ObjectId,
    ref: "Projects",
    required: true,
  },
  Views: {
    type: Number,
  },
  LinkYoutube: {
    type: String,
    required: true,
  },
  IsPublish: {
    type: Boolean,
    required: true,
  },
  Tags: [{ type: String }],
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

  // for seo
  OgUrl: {
    type: String,
  },
  MetaKeywords: {
    type: String,
  },
  MetaTitle: {
    type: String,
  },
  OgxTitle: {
    type: String,
  },
  OgTitle: {
    type: String,
  },
  OgFacebookTitle: {
    type: String,
  },
  MetaDescription: {
    type: String,
  },
  OgDescription: {
    type: String,
  },
  OgxDescription: {
    type: String,
  },
  OgFacebookDescription: {
    type: String,
  },
  OgFacebookImage: {
    type: String,
  },
  OgxImage: {
    type: String,
  },
});

VideoSchema.index({ OgUrl: 1 });

export const VideoModal = mongoose.models.Videos || mongoose.model("Videos", VideoSchema);
