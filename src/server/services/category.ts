import mongoose from "mongoose";
import connectDB from "../db";
import { ArticleModel } from "../models/article";
import { NextResponse } from "next/server";
import { convertTitleToSlug } from "@/utils/backend/common";
import { ECategorySort } from "@/enum/category";
import { CategoryModel } from "../models/category";

class CategoryService {
  static async getAll(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const fromDate = searchParams.get("FromDate");
      const toDate = searchParams.get("ToDate");
      const sort = searchParams.get("Sort");
      const searchByName = searchParams.get("SearchByName");
      const isPublish = searchParams.get("IsPublish");

      const pageIndex = searchParams.get("PageIndex") || 1;
      const pageSize = searchParams.get("PageSize") || 20;
      const skip = (pageIndex - 1) * pageSize;

      let query: any = {};
      let sortQuery: any = {};

      if (searchByName) {
        query.Name = { $regex: searchByName, $options: "i" };
      }
      if (fromDate && toDate) {
        const startOfDay = new Date(Number(fromDate));
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(Number(toDate));
        endOfDay.setUTCHours(23, 59, 59, 999);

        query.Created = {
          $gte: startOfDay.toISOString(),
          $lte: endOfDay.toISOString(),
        };
      }
      if (isPublish !== undefined && isPublish !== null) {
        query.IsPublish = isPublish;
      }
      if (sort) {
        switch (Number(sort)) {
          case ECategorySort.Newest:
            sortQuery.Created = -1;
            break;
          case ECategorySort.Oldest:
            sortQuery.Created = 1;
            break;
        }
      }

      let totalDocs = 0;

      if (searchByName) {
        const regex = new RegExp(searchByName, "i");
        totalDocs = await CategoryModel.countDocuments({
          ...query,
          Name: { $regex: regex },
        });
        const categories = await CategoryModel.find({
          ...query,
          Name: { $regex: regex },
        }).sort(sortQuery);

        return NextResponse.json(
          {
            Success: true,
            Message: "Successfully",
            Data: categories,
            PageSize: Number(pageSize),
            PageIndex: Number(pageIndex),
            TotalPage: Math.ceil(totalDocs / pageSize),
            Total: totalDocs,
          },
          { status: 200 }
        );
      } else {
        totalDocs = await CategoryModel.countDocuments(query);
        const categories = await CategoryModel.find({ ...query })
          .sort(sortQuery)
          .skip(skip)
          .limit(pageSize)
          .populate("CreatedBy", "UserName -_id");

        const sendCategoris = await Promise.all(
          categories.map(async (category) => {
            const articleCount = await ArticleModel.countDocuments({
              CategoryId: category._id,
            });

            return {
              ...category.toObject(),
              CreatedBy: category.CreatedBy.UserName,
              Articles: articleCount,
            };
          })
        );
        return NextResponse.json(
          {
            Success: true,
            Message: "Successfully",
            Data: sendCategoris,
            PageSize: Number(pageSize),
            PageIndex: Number(pageIndex),
            TotalPage: Math.ceil(totalDocs / pageSize),
            Total: totalDocs,
          },
          { status: 200 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        {
          Success: false,
          Message: "Internal server error!",
        },
        { status: 500 }
      );
    }
  }

  static async create(request: TMyNextRequest) {
    try {
      const { userId } = request;

      await connectDB();

      const body = await request.json();

      const { Name, Color, Description } = body;

      if (!Name) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Missing key Name",
          }),
          { status: 409 }
        );
      }

      const isExitName = await CategoryModel.findOne({ Name });

      if (isExitName) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Caterogy Name already exists!",
          }),
          { status: 409 }
        );
      }

      const code = convertTitleToSlug(Name);

      const newCaterogy = new CategoryModel({
        Name,
        Color,
        Description,
        CreatedBy: userId,
        Code: code,
      });

      await newCaterogy.save();

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Create new category successfully!",
        }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse(
        JSON.stringify({
          Success: false,
          Message: "Internal server error!",
        }),
        { status: 500 }
      );
    }
  }

  static async delete(
    request: TMyNextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      await connectDB();
      const { id } = params;

      const categoryTarget = await CategoryModel.findByIdAndDelete(id);

      if (!categoryTarget) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Category not found or Deleted!",
          }),
          { status: 409 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Delete successfully!",
        }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse(
        JSON.stringify({
          Success: false,
          Message: "Internal server error!",
        }),
        { status: 500 }
      );
    }
  }

  static async update(request: TMyNextRequest) {
    try {
      const { userId } = request;

      await connectDB();

      const body = await request.json();

      const { _id, Name, Color, Description, IsFeature, IsPublish } = body;

      const isExitName = await CategoryModel.findOne({
        Name: Name.trim(),
        _id: { $ne: _id },
      });

      if (isExitName) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Caterogy Name already exists!",
          }),
          { status: 409 }
        );
      }

      let updateCategory: any = {
        Name,
        Color,
        Description,
        Updated: Date.now(),
        UpdatedBy: userId,
        IsFeature: IsFeature,
        IsPublish: IsPublish,
        Code: convertTitleToSlug(Name),
      };

      updateCategory = await CategoryModel.findOneAndUpdate(
        { _id },
        updateCategory,
        { new: true }
      );

      if (!updateCategory) {
        return new NextResponse(
          JSON.stringify({ Success: false, Message: "Category not found!" }),
          { status: 409 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Update Category successfully!",
        }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse(
        JSON.stringify({
          Success: false,
          Message: "Internal server error!",
        }),
        { status: 500 }
      );
    }
  }

  static async getByCode(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const code = searchParams.get("code");

      const target = await CategoryModel.findOne({ Code: `/${code}` });

      if (!target) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Category not found!",
          }),
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          Data: target,
          Success: true,
        },
        { status: 200 }
      );
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          Success: false,
          Message: "Internal server error!",
        }),
        { status: 500 }
      );
    }
  }
}

export default CategoryService;
