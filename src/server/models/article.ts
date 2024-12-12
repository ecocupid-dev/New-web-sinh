import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  OldId: {
    type: String,
  },
  Thumnail: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
    unique: true,
  },
  IsPublish: {
    type: Boolean,
    required: true,
  },
  IsFeature: {
    type: Boolean,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  Views: {
    type: Number,
  },
  Summary: {
    type: String,
    required: true,
  },
  CountryId: {
    type: Number,
    required: true,
  },
  ProjectId: {
    type: Schema.Types.ObjectId,
    ref: "Projects",
    required: true,
  },
  CategoryId: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  WriterId: {
    type: Schema.Types.ObjectId,
    ref: "Writers",
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
    required: true,
  },
  Updated: {
    type: Date,
  },
  UpdatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
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

ArticleSchema.index({ CreatedBy: 1 });
ArticleSchema.index({ ProjectId: 1 });
ArticleSchema.index({ CategoryId: 1 });
ArticleSchema.index({ OgUrl: 1 });

export const ArticleModel =
  mongoose.models.Articles || mongoose.model("Articles", ArticleSchema);
