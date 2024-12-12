import { ArticleModel } from "@/server/models/article";
import { VideoModal } from "@/server/models/videos";
import { NextResponse } from "next/server";

export const getVideosWithAggregateMethod = async ({
  search,
  query,
}: {
  search: string;
  query: object;
}) => {
  try {
    const result = await VideoModal.aggregate([
      {
        $lookup: {
          from: "projects", // The Projects collection name in MongoDB
          localField: "ProjectId", // Field in Videos
          foreignField: "_id", // Field in Projects
          as: "ProjectData", // Name for the joined data
        },
      },
      {
        $unwind: "$ProjectData", // Deconstructs the array of projects into individual documents
      },
      {
        $lookup: {
          from: "users",
          localField: "CreatedBy",
          foreignField: "_id",
          as: "CreatedBy",
        },
      },
      {
        $unwind: "$CreatedBy",
      },
      {
        $lookup: {
          from: "users",
          localField: "UpdatedBy",
          foreignField: "_id",
          as: "UpdatedBy",
        },
      },
      {
        $unwind: "$UpdatedBy",
      },
      {
        $match: {
          $or: [
            { Title: { $regex: search, $options: "i" } },
            { Tags: { $regex: search, $options: "i" } },
            { "ProjectData.Title": { $regex: search, $options: "i" } },
          ],
          ...query,
        },
      },
      {
        $project: {
          Title: 1,
          IsFeature: 1,
          Thumnail: 1,
          Summary: 1,
          Views: 1,
          Tags: 1,
          OgUrl: 1,
          Created: 1,
          Updated: 1,
          "ProjectData.Title": 1,
          "ProjectData.Description": 1,
          "CreatedBy.UserName": 1,
          "UpdatedBy.UserName": 1,
        },
      },
    ]);

    return { success: false, data: result };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getArticlesWithAggregateMethod = async ({
  search,
  query,
}: {
  search: string;
  query: object;
}) => {
  try {
    const result = await ArticleModel.aggregate([
      {
        $lookup: {
          from: "projects", // The Projects collection name in MongoDB
          localField: "ProjectId", // Field in Videos
          foreignField: "_id", // Field in Projects
          as: "ProjectData", // Name for the joined data
        },
      },
      {
        $unwind: "$ProjectData",
      },
      {
        $lookup: {
          from: "categories",
          localField: "CategoryId",
          foreignField: "_id",
          as: "CategoryData",
        },
      },
      {
        $unwind: "$CategoryData",
      },
      {
        $lookup: {
          from: "users",
          localField: "CreatedBy",
          foreignField: "_id",
          as: "CreatedBy",
        },
      },
      {
        $unwind: "$CreatedBy",
      },
      {
        $lookup: {
          from: "writers",
          localField: "WriterId",
          foreignField: "_id",
          as: "Author",
        },
      },
      {
        $unwind: "$Author",
      },
      {
        $lookup: {
          from: "users",
          localField: "UpdatedBy",
          foreignField: "_id",
          as: "UpdatedBy",
        },
      },
      {
        $unwind: "$UpdatedBy",
      },
      {
        $match: {
          $or: [
            { Title: { $regex: search, $options: "i" } },
            { Tags: { $regex: search, $options: "i" } },
            { "ProjectData.Title": { $regex: search, $options: "i" } },
          ],
          ...query,
        },
      },
      {
        $project: {
          Title: 1,
          IsFeature: 1,
          Thumnail: 1,
          CountryId: 1,
          Summary: 1,
          Views: 1,
          Tags: 1,
          OgUrl: 1,
          Created: 1,
          Updated: 1,
          "ProjectData.Title": 1,
          "ProjectData.Description": 1,
          "CategoryData.Name": 1,
          "CreatedBy.UserName": 1,
          "Author.UserName": 1,
          "Author.Avatar": 1,
          "UpdatedBy.UserName": 1,
        },
      },
    ]);

    return { success: false, data: result };
  } catch (error) {
    return { success: false, error: error };
  }
};
