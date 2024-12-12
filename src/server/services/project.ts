import { EProjectSort } from "@/enum/project";
import { NextResponse } from "next/server";
import connectDB from "../db";
import { ArticleModel } from "../models/article";
import { ProjectModel } from "../models/project";
import { VideoModal } from "../models/videos";

class ProjectService {
  static async getAll(request: TMyNextRequest) {
    try {
      const { userId, RoleID } = request;

      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const searchByName = searchParams.get("SearchByName") || '';
      const countryId = searchParams.get("CountryId");
      const isPublish = searchParams.get("IsPublish");
      const fromDate = searchParams.get("FromDate");
      const toDate = searchParams.get("ToDate");
      const sort = searchParams.get("Sort");

      const pageIndex = searchParams.get("PageIndex") || 1;
      const pageSize = searchParams.get("PageSize") || 20;

      const skip = (pageIndex - 1) * pageSize;

      let query: any = {};
      let sortQuery: any = {};

      if (RoleID === 3) {
        query.CreatedBy = userId;
      }

      if (searchByName) {
        query.Title = { $regex: new RegExp(searchByName, "i") };
      }

      if (isPublish !== undefined && isPublish !== null) {
        query.IsPublish = isPublish;
      }

      if (countryId) {
        query.CountryId = countryId;
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
      if (sort) {
        switch (Number(sort)) {
          case EProjectSort.Newest:
            sortQuery.Created = -1;
            break;
          case EProjectSort.Oldest:
            sortQuery.Created = 1;
            break;
        }
      }

      const totalDocs = await ProjectModel.countDocuments(query);
      const projects = await ProjectModel.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(pageSize)
        .populate("CreatedBy", "UserName -_id")
        .populate("UpdatedBy", "UserName -_id");

      // Thêm bước đếm số lượng Articles cho mỗi Project
      const sendProjects = await Promise.all(
        projects.map(async (project) => {
          const articleCount = await ArticleModel.countDocuments({
            ProjectId: project._id,
          });
          const videoCount = await VideoModal.countDocuments({
            ProjectId: project._id,
          });

          return {
            ...project.toObject(),
            CreatedBy: project.CreatedBy.UserName,
            UpdatedBy: project.Updated ? project.UpdatedBy.UserName : "",
            Articles: articleCount,
            Videos: videoCount,
          };
        })
      );

      return NextResponse.json(
        {
          Success: true,
          Message: "Successfully",
          Data: sendProjects,
          PageSize: Number(pageSize),
          PageIndex: Number(pageIndex),
          TotalPage: Math.ceil(totalDocs / pageSize),
          Total: totalDocs,
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

  static async create(request: TMyNextRequest) {
    try {
      const { userId } = request;

      await connectDB();

      const body = await request.json();

      const { Title } = body;

      if (!Title) {
        return new NextResponse(
          JSON.stringify({
            Status: false,
            Message: "Missing key Title of project",
          }),
          { status: 409 }
        );
      }

      const isExitTitle = await ProjectModel.findOne({ Title: Title });

      if (isExitTitle) {
        return new NextResponse(
          JSON.stringify({
            Status: false,
            Message: "Project Title already exists!",
          }),
          { status: 409 }
        );
      }

      const newProject = new ProjectModel({
        ...body,
        CreatedBy: userId,
      });

      await newProject.save();

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Create Project successfully!",
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

      const projectTarget = await ProjectModel.findByIdAndDelete(id);

      if (!projectTarget) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Project not found or Deleted!",
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

      const projectTarget = await ProjectModel.findById({ _id: id });

      if (!projectTarget) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Project not found!",
          }),
          { status: 404 }
        );
      }

      const articleCount = await ArticleModel.countDocuments({
        ProjectId: { _id: id },
      });
      const videoCount = await VideoModal.countDocuments({
        ProjectId: { _id: id },
      });

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Data: {
            project: projectTarget,
            countArticle: articleCount,
            countVideo: videoCount,
          },
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

      delete body.CreatedBy;
      delete body.Created;

      if (!body.Title) {
        return new NextResponse(
          JSON.stringify({
            Status: false,
            Message: "Missing key Title of project",
          }),
          { status: 409 }
        );
      }

      const isExitTitle = await ProjectModel.findOne({
        Title: body.Title,
        _id: { $ne: body._id },
      });

      if (isExitTitle) {
        return new NextResponse(
          JSON.stringify({
            Status: false,
            Message: "Project Title already exists!",
          }),
          { status: 409 }
        );
      }

      const updateProject = await ProjectModel.findByIdAndUpdate(
        body._id,
        {
          $set: {
            ...body,
            Updated: Date.now(),
            UpdatedBy: userId,
          },
        },
        { new: true }
      );

      if (!updateProject) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Project not found!",
          }),
          { status: 409 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Project updated successfully!",
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
}

export default ProjectService;
