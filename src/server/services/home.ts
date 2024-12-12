import { EMultipleResourcesSort, ESearchResourceType } from "@/enum/home";
import {
  getArticlesWithAggregateMethod,
  getVideosWithAggregateMethod,
} from "@/utils/backend/home.utils";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "../db";
import { ArticleModel } from "../models/article";
import { CategoryModel } from "../models/category";
import { ProjectModel } from "../models/project";
import { VideoModal } from "../models/videos";
import { WriterModel } from "../models/writer";

class HomeService {
  static async getCategoryList(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const IsFeature = searchParams.get("IsFeature");

      let query: any = {
        IsPublish: true,
      };

      if (IsFeature) {
        query.IsFeature = IsFeature;
      }
      const categories = await CategoryModel.find(query).select(
        "_id Name Code Description"
      );

      return NextResponse.json(
        {
          Success: true,
          Data: categories,
        },
        { status: 200 }
      );
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

  static async getVideoList(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const IsFeature = searchParams.get("IsFeature");
      const IsMostView = searchParams.get("IsMostView");
      const IsNewest = searchParams.get("IsNewest");
      const Limit = searchParams.get("Limit");

      let filter: any = {
        IsPublish: true,
      };

      if (IsFeature) {
        const isFeature = IsFeature === "true";
        filter.IsFeature = isFeature;
      }

      let query = VideoModal.find(filter);

      if (IsMostView) {
        const isMostView = IsMostView === "true";
        if (isMostView) {
          query.sort({ Views: -1 });
        }
      }

      if (IsNewest) {
        const isNewest = IsNewest === "true";
        if (isNewest) {
          query.sort({ Created: -1 });
        }
      }

      const limitValue = Limit ? Number(Limit) : 10;

      const videos = await query
        .limit(limitValue)
        .select("Title Thumnail LinkYoutube OgUrl Tags Summary");

      return NextResponse.json(
        {
          Success: true,
          Data: videos,
        },
        { status: 200 }
      );
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

  static async getEcoHeroesList(request: TMyNextRequest) {
    try {
      await connectDB();

      const topProjects = await ArticleModel.aggregate([
        {
          $group: {
            _id: "$ProjectId",
            articleCount: { $sum: 1 },
            maxCreated: { $max: "$Created" },
          },
        },
        {
          $sort: { articleCount: -1, maxCreated: -1 },
        },
        {
          $limit: 4,
        },
        {
          $lookup: {
            from: "projects",
            localField: "_id",
            foreignField: "_id",
            as: "projectDetails",
          },
        },
        {
          $unwind: "$projectDetails",
        },
        {
          $project: {
            _id: "$projectDetails._id",
            Title: "$projectDetails.Title",
            Image: "$projectDetails.Image",
            // Description: "$projectDetails.Description",
            articleCount: 1,
          },
        },
      ]);

      return NextResponse.json(
        {
          Success: true,
          Message: "Fetched top projects successfully",
          Data: topProjects,
        },
        { status: 200 }
      );
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

  static async getProjectList(request: TMyNextRequest) {
    try {
      await connectDB();

      const projects = await ProjectModel.find().select(
        "Title Image CountryId"
      );
      const totalDocs = await ProjectModel.countDocuments();
      // Nhóm các project theo CountryId

      const groupedProjects = projects.reduce((acc, project) => {
        const countryId = project.CountryId;

        if (!acc[countryId]) {
          acc[countryId] = [];
        }
        acc[countryId].push(project);
        return acc;
      }, {});

      return NextResponse.json(
        {
          Success: true,
          Message: "Fetched projects grouped by country successfully",
          Data: { projects: { ...groupedProjects }, totalProject: totalDocs },
        },
        { status: 200 }
      );
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

  static async getArticlesByCategory(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const CategoryId = searchParams.get("CategoryId");
      const IsFeature = searchParams.get("IsFeature");
      const IsMostView = searchParams.get("IsMostView");
      const IsNewest = searchParams.get("IsNewest");
      const Limit = searchParams.get("Limit");

      if (!CategoryId) {
        return NextResponse.json(
          {
            Success: false,
            Message: "Missing CategoryId!",
          },
          { status: 400 }
        );
      }

      let filter: any = { CategoryId, IsPublish: true };

      if (IsFeature) {
        const isFeature = IsFeature === "true";
        filter.IsFeature = isFeature;
      }

      let query = ArticleModel.find(filter);

      if (IsMostView) {
        const isMostView = IsMostView === "true";
        if (isMostView) {
          query.sort({ Views: -1 });
        }
      }

      if (IsNewest) {
        const isNewest = IsNewest === "true";
        if (isNewest) {
          query.sort({ Created: -1 });
        }
      }

      const limitValue = Limit ? Number(Limit) : 10;

      const articles = await query
        .select(
          "_id OgUrl Thumnail Summary CountryId Title Tags WriterId Created Views"
        )
        .limit(limitValue);

      if (!articles) {
        return NextResponse.json(
          {
            Success: false,
            Message: "Article not found!",
          },
          { status: 409 }
        );
      }

      const sendData = await Promise.all(
        articles.map(async (item) => {
          const author = await WriterModel.findById({
            _id: item.WriterId,
          }).select("Avatar UserName");

          const cate = await CategoryModel.findById({
            _id: CategoryId,
          }).select("Name Color -_id");

          const { WriterId, ...res } = item.toObject();
          const { Name, Color } = cate.toObject();

          return {
            ...res,
            CatName: Name,
            CatColor: Color,
            Author: author.toObject(),
          };
        })
      );

      return NextResponse.json(
        {
          Data: sendData,
          Success: true,
        },
        { status: 200 }
      );
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

  static async getArticleWithOutCatId(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const CategoryId = searchParams.get("CategoryId");
      const IsFeature = searchParams.get("IsFeature");
      const IsMostView = searchParams.get("IsMostView");
      const IsNewest = searchParams.get("IsNewest");
      const Limit = searchParams.get("Limit");

      if (!CategoryId) {
        return NextResponse.json(
          {
            Success: false,
            Message: "Missing CategoryId!",
          },
          { status: 400 }
        );
      }

      let filter: any = {
        CategoryId: { $ne: CategoryId },
        IsPublish: true,
      };

      if (IsFeature) {
        const isFeature = IsFeature === "true";
        filter.IsFeature = isFeature;
      }

      let query = ArticleModel.find(filter);

      if (IsMostView) {
        const isMostView = IsMostView === "true";
        if (isMostView) {
          query.sort({ Views: -1 });
        }
      }

      if (IsNewest) {
        const isNewest = IsNewest === "true";
        if (isNewest) {
          query.sort({ Created: -1 });
        }
      }

      const limitValue = Limit ? Number(Limit) : 10;

      const articles = await query
        .select(
          "_id OgUrl Thumnail Summary CountryId CategoryId Title Tags WriterId Created Views"
        )
        .limit(limitValue);

      if (!articles) {
        return NextResponse.json(
          {
            Success: false,
            Message: "Article not found!",
          },
          { status: 409 }
        );
      }

      const sendData = await Promise.all(
        articles.map(async (item) => {
          const author = await WriterModel.findById({
            _id: item.WriterId,
          }).select("Avatar UserName");

          const cate = await CategoryModel.findById({
            _id: item.CategoryId,
          }).select("Name Color -_id");

          const { WriterId, ...res } = item.toObject();
          const { Name, Color } = cate.toObject();

          return {
            ...res,
            CatName: Name,
            CatColor: Color,
            Author: author.toObject(),
          };
        })
      );

      return NextResponse.json(
        {
          Data: sendData,
          Success: true,
        },
        { status: 200 }
      );
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

  static async getMultipleResources(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const Search = searchParams.get("Search") || "";
      const Sort = searchParams.get("Sort");
      const FromDate = searchParams.get("FromDate");
      const ToDate = searchParams.get("ToDate");
      const CategoryId = searchParams.get("CategoryId");
      const CountryId = searchParams.get("CountryId");
      const ResourceType = searchParams.get("ResourceType") || "";

      const PageIndex = searchParams.get("PageIndex") || 1;
      const PageSize = searchParams.get("PageSize") || 20;

      const skip = (PageIndex - 1) * PageSize;

      const query: any = {};

      // ========== Build query ==========
      if (FromDate && ToDate) {
        const startOfDay = new Date(Number(FromDate));
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(Number(ToDate));
        endOfDay.setUTCHours(23, 59, 59, 999);

        query.Created = {
          $gte: startOfDay,
          $lte: endOfDay,
        };
      }
      if (CategoryId) {
        query.CategoryId = new mongoose.Types.ObjectId(CategoryId); // Chuyển CategoryId thành ObjectId nếu cần
      }
      if (CountryId) {
        query.CountryId = Number(CountryId);
      }

      let mergedResults: any = [];

      // ========== Fetch data ==========
      // ----- Find Eco-Films -----
      if (
        !ResourceType ||
        ResourceType.includes(ESearchResourceType.EcoFilms)
      ) {
        const videos = await getVideosWithAggregateMethod({
          search: Search,
          query: {
            IsPublish: true,
            ...query,
          },
        });

        if (!videos?.success) {
          console.error(videos.error);
          return NextResponse.json(
            {
              Success: false,
              Message: "Internal server error!",
            },
            { status: 500 }
          );
        }

        mergedResults = [
          ...(videos.data || [])?.map((item) => ({
            ...item,
            ResourceType: ESearchResourceType.EcoFilms,
          })),
        ];
      }

      // ----- Find Our Readers' Stories Category Id -----
      let ourReaderStoriesCatagoryId = undefined;
      if (
        !CategoryId ||
        ResourceType.includes(ESearchResourceType.EcoStories) ||
        ResourceType.includes(ESearchResourceType.OurReaderStories)
      ) {
        const ourReaderStoriesCatagory = await CategoryModel.findOne({
          Name: "Our Readers' Stories",
        });
        if (ourReaderStoriesCatagory) {
          ourReaderStoriesCatagoryId = ourReaderStoriesCatagory._id;
        }
      }

      // ----- Find Eco-Stories -----
      if (
        !ResourceType ||
        ResourceType.includes(ESearchResourceType.EcoStories)
      ) {
        const articles = await getArticlesWithAggregateMethod({
          search: Search,
          query: {
            IsPublish: true,
            CategoryId: { $ne: ourReaderStoriesCatagoryId },
            ...query,
          },
        });

        if (!articles?.success) {
          console.error(articles.error);
          return NextResponse.json(
            {
              Success: false,
              Message: "Internal server error!",
            },
            { status: 500 }
          );
        }

        // console.log(articles, "===articles===");
        mergedResults = [
          ...mergedResults,
          ...(articles.data || [])?.map((item) => ({
            ...item,
            ResourceType: ESearchResourceType.EcoStories,
          })),
        ];
      }

      // ----- Find Our Reader's Stories -----
      if (
        !CategoryId &&
        ourReaderStoriesCatagoryId &&
        (!ResourceType ||
          ResourceType.includes(ESearchResourceType.OurReaderStories))
      ) {
        const ourReaderStories = await getArticlesWithAggregateMethod({
          search: Search,
          query: {
            IsPublish: true,
            CategoryId: ourReaderStoriesCatagoryId,
            ...query,
          },
        });

        if (!ourReaderStories?.success) {
          console.error(ourReaderStories.error);
          return NextResponse.json(
            {
              Success: false,
              Message: "Internal server error!",
            },
            { status: 500 }
          );
        }

        mergedResults = [
          ...mergedResults,
          ...(ourReaderStories.data || [])?.map((item) => ({
            ...item,
            ResourceType: ESearchResourceType.OurReaderStories,
          })),
        ];
      }

      // ========== Merge and sort results ==========
      mergedResults = mergedResults.sort((a: any, b: any) => {
        switch (Number(Sort)) {
          case EMultipleResourcesSort.Newest:
            return new Date(b.Created) > new Date(a.Created) ? 1 : -1;
          case EMultipleResourcesSort.Oldest:
            return new Date(a.Created) > new Date(b.Created) ? 1 : -1;
          case EMultipleResourcesSort.MostViewed:
            return b.Views - a.Views;
          default:
            return (new Date(b.Created) as any) - (new Date(a.Created) as any); // Default to newest
        }
      });

      // ========== Paginate merged results ==========
      const totalRow = mergedResults?.length;
      const totalPage = Math.ceil(totalRow / PageSize);

      // ----- Prevent wrong page index transmission -----
      if (totalPage < PageIndex) {
        return NextResponse.json(
          {
            Success: true,
            Message: "Successfully",
            Data: [],
            PageSize: Number(PageSize),
            PageIndex: Number(PageIndex),
            TotalPage: 0,
            Total: 0,
          },
          { status: 200 }
        );
      }

      // ----- Return result -----
      const paginatedResults = mergedResults.slice(skip, PageSize * PageIndex);

      return NextResponse.json(
        {
          Success: true,
          Message: "Successfully",
          Data: paginatedResults,
          PageSize: Number(PageSize),
          PageIndex: Number(PageIndex),
          TotalPage: totalPage,
          Total: totalRow,
        },
        { status: 200 }
      );
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
}

export default HomeService;
