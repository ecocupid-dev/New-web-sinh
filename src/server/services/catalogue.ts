import { NextResponse } from "next/server";
import connectDB from "../db";
import { UserModel } from "../models/users";
import { WriterModel } from "../models/writer";
import { CategoryModel } from "../models/category";
import { ProjectModel } from "../models/project";

class CatalogueService {
  static async getAllUser(request: TMyNextRequest) {
    try {
      await connectDB();

      const users = await UserModel.find().select("_id UserName");

      if (!users) {
        return NextResponse.json(
          {
            Success: false,
            Message: "User not found!",
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          Success: true,
          Message: "",
          Data: users,
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

  static async getAllWriter(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const IsPublish = searchParams.get("IsPublish");

      let query: any = {};

      if (IsPublish !== undefined && IsPublish !== null)
        query.IsPublish = IsPublish;

      const writers = await WriterModel.find(query).select(
        "_id UserName IsPublish"
      );

      if (!writers) {
        return NextResponse.json(
          {
            Success: false,
            Message: "Writer not found!",
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          Success: true,
          Message: "",
          Data: writers,
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

  static async getAllCaterogy(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const IsPublish = searchParams.get("IsPublish");

      let query: any = {};

      if (IsPublish !== undefined && IsPublish !== null)
        query.IsPublish = IsPublish;

      const caterogies = await CategoryModel.find(query).select(
        "_id Name IsPublish"
      );

      if (!caterogies) {
        return NextResponse.json(
          {
            Success: false,
            Message: "Caterogies not found!",
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          Success: true,
          Message: "",
          Data: caterogies,
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

  static async getAllProjects(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const IsPublish = searchParams.get("IsPublish");

      let query: any = {};

      if (IsPublish !== undefined && IsPublish !== null)
        query.IsPublish = IsPublish;

      const projects = await ProjectModel.find(query).select(
        "_id Title IsPublish"
      );

      if (!projects) {
        return NextResponse.json(
          {
            Success: false,
            Message: "Projects not found!",
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          Success: true,
          Message: "",
          Data: projects,
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

export default CatalogueService;
