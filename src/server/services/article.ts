import mongoose from "mongoose";
import connectDB from "../db";
import { ArticleModel } from "../models/article";
import { NextResponse } from "next/server";
import { convertTitleToSlug } from "@/utils/backend/common";

class ArticleService {
  static async getAll(request: TMyNextRequest) {
    try {
      const { userId, RoleID } = request;

      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const Title = searchParams.get("Title");
      const CategoryId = searchParams.get("CategoryId");
      const FromDate = searchParams.get("FromDate");
      const ToDate = searchParams.get("ToDate");
      const CountryId = searchParams.get("CountryId");
      const IsMostImpactful = searchParams.get("IsMostImpactful");
      const IsNewest = searchParams.get("IsNewest");
      const IsOldest = searchParams.get("IsOldest");
      const PageIndex = searchParams.get("PageIndex") || 1;
      const PageSize = searchParams.get("PageSize") || 20;

      const skip = (PageIndex - 1) * PageSize;

      let query: any = {};
      let sort: any = {};

      if (RoleID === 3) {
        query.CreatedBy = userId;
      }

      if (Title) {
        query.Title = { $regex: Title, $options: "i" }; // Tìm kiếm theo Title, không phân biệt hoa thường
      }
      if (CategoryId) {
        query.CategoryId = new mongoose.Types.ObjectId(CategoryId); // Chuyển CategoryId thành ObjectId nếu cần
      }
      if (FromDate && ToDate) {
        const startOfDay = new Date(Number(FromDate));
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(Number(ToDate));
        endOfDay.setUTCHours(23, 59, 59, 999);

        query.Created = {
          $gte: startOfDay.toISOString(),
          $lte: endOfDay.toISOString(),
        };
      }

      if (CountryId) {
        query.CountryId = Number(CountryId);
      }

      if (IsMostImpactful) {
        sort.Views = -1; // Sắp xếp giảm dần theo Views
      }
      if (IsNewest) {
        sort.Created = -1; // Sắp xếp giảm dần theo Created
      }
      if (IsOldest) {
        sort.Created = 1; // Sắp xếp tăng dần theo Created
      }

      // Nếu không có sắp xếp nào được chọn, mặc định sắp xếp theo Created giảm dần
      if (Object.keys(sort).length === 0) {
        sort.Created = -1;
      }

      const totalDocs = await ArticleModel.countDocuments(query);

      if (totalDocs === 0) {
        return NextResponse.json(
          {
            Success: true,
            Message: "Articles not found!",
          },
          { status: 404 }
        );
      }

      const articles = await ArticleModel.find(query)
        .sort(sort)
        .skip(skip)
        .limit(PageSize)
        .select(
          "-Content -Summary -Tags -OgUrl -MetaDescription -MetaKeywords -MetaTitle -OgDescription -OgFacebookDescription -OgFacebookImage -OgFacebookTitle -OgTitle -OgxDescription -OgxImage -OgxTitle"
        )
        .populate("CreatedBy", "UserName -_id")
        .populate("WriterId", "UserName -_id")
        .populate("UpdatedBy", "UserName -_id")
        .populate("ProjectId", "Title _id")
        .populate("CategoryId", "Name _id");

      const sendArticles = articles.map((article: any) => {
        const articleObject = article.toObject();

        return {
          ...articleObject,
          ProjectName: article.ProjectId.Title,
          ProjectId: article.ProjectId._id,
          CategoryId: article.CategoryId._id,
          CategoryName: article.CategoryId.Name,
          CreatedBy: article.CreatedBy.UserName,
          UpdatedBy: article.UpdatedBy ? article.UpdatedBy.UserName : "",
          WriterName: article.WriterId ? article.WriterId.UserName : "",
        };
      });

      return NextResponse.json(
        {
          Success: true,
          Message: "Successfully",
          Data: sendArticles,
          PageSize: Number(PageSize),
          PageIndex: Number(PageIndex),
          TotalPage: Math.ceil(totalDocs / PageSize),
          Total: totalDocs,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { Success: false, Message: "Error fetching articles" },
        { status: 500 }
      );
    }
  }

  static async create(request: TMyNextRequest) {
    try {
      const { userId } = request;

      await connectDB();

      const body = await request.json();

      const {
        Title,
        Thumnail,
        Summary,
        Content,
        ProjectId,
        CategoryId,
        OldId,
        WriterId,
      } = body;

      if (
        !Title ||
        !Thumnail ||
        !Summary ||
        !Content ||
        !ProjectId ||
        !CategoryId ||
        !WriterId
      ) {
        return new NextResponse(
          JSON.stringify({
            Status: false,
            Message: "Properties is missing!",
          }),
          { status: 409 }
        );
      }

      const query: any = {
        $or: [{ Title: Title.trim() }],
      };

      if (OldId !== "") {
        query.$or.push({ OldId: OldId });
      }

      const isExisting = await ArticleModel.findOne(query);

      if (isExisting) {
        let targetMsg = "";
        if (isExisting.Title.trim() === Title.trim()) {
          targetMsg = "Title";
        }

        if (OldId && isExisting.OldId === OldId) {
          targetMsg = "Old Id";
        }

        if (targetMsg) {
          return new NextResponse(
            JSON.stringify({
              Success: false,
              Message: `${targetMsg} already taken!`,
            }),
            { status: 409 }
          );
        }
      }

      const createOgUrl = convertTitleToSlug(Title);

      const newArticle = new ArticleModel({
        ...body,
        OgUrl: `/${createOgUrl}`,
        CreatedBy: userId,
      });

      await newArticle.save();

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Create Article successfully!",
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

      const articleTarget = await ArticleModel.findByIdAndDelete(id);

      if (!articleTarget) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Article not found or Deleted!",
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

  static async getById(
    request: TMyNextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      await connectDB();
      const { id } = params;

      if (!id) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Article id is requirement!",
          }),
          { status: 400 }
        );
      }

      const article = await ArticleModel.findById(id);

      if (!article) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Article does not exist!",
          }),
          { status: 404 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Status: true,
          Message: "Successfully!",
          Data: article,
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

      const query: any = {
        $or: [{ Title: body.Title }],
      };

      if (body.OldId !== "") {
        query.$or.push({ OldId: body.OldId });
      }

      // Thêm điều kiện để loại trừ bài viết đang cập nhật bằng cách sử dụng $ne (not equal)
      query._id = { $ne: body._id };

      const isExisting = await ArticleModel.findOne(query);

      if (isExisting) {
        let targetMsg = "";
        if (isExisting.Title === body.Title) {
          targetMsg = "Title";
        }

        if (body.OldId && isExisting.OldId === body.OldId) {
          targetMsg = "Old Id";
        }

        if (targetMsg) {
          return new NextResponse(
            JSON.stringify({
              Success: false,
              Message: `${targetMsg} already taken!`,
            }),
            { status: 409 }
          );
        }
      }

      const createOgUrl = convertTitleToSlug(body.Title);
      const newData = {
        ...body,
        OgUrl: `/${createOgUrl}`,
      };

      const updateArticle = await ArticleModel.findByIdAndUpdate(newData._id, {
        $set: {
          ...newData,
          Updated: Date.now(),
          UpdatedBy: userId,
        },
      });

      if (!updateArticle) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Article not found!",
          }),
          { status: 409 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Article updated successfully!",
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
      const { userId, RoleID } = request;

      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const code = searchParams.get("code");
      const isForSEO = searchParams.get("isForSEO");

      const isForSEOBoolean = isForSEO === "true";

      const seoFields =
        "Thumnail Title Summary OgUrl MetaKeywords MetaTitle OgxTitle OgTitle OgFacebookTitle MetaDescription OgDescription OgxDescription OgFacebookDescription OgFacebookImage OgxImage";
      const nonSeoFields =
        "OldId Thumnail Title _id Content Views Summary CountryId ProjectId CategoryId WriterId Tags Created CreatedBy";

      const query = { OgUrl: `/${code}` };
      const selectFields = isForSEOBoolean ? seoFields : nonSeoFields;
      const updateOptions = isForSEOBoolean ? {} : { $inc: { Views: 1 } };
      const findOptions = isForSEOBoolean ? {} : { new: true };

      const target = isForSEOBoolean
        ? await ArticleModel.findOne(query).select(selectFields)
        : await ArticleModel.findOneAndUpdate(
            query,
            updateOptions,
            findOptions
          ).select(selectFields);

      if (!target) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Article not found!",
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

export default ArticleService;
