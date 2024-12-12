import { EVideoSort } from "@/enum/video";
import { convertTitleToSlug } from "@/utils/backend/common";
import { NextResponse } from "next/server";
import connectDB from "../db";
import { VideoModal } from "../models/videos";

class VideoService {
  static async getAll(request: TMyNextRequest) {
    try {
      const { userId, RoleID } = request;

      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const searchByName = searchParams.get("SearchByName") || "";
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
        query.Title = { $regex: searchByName, $options: "i" };
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
          case EVideoSort.Newest:
            sortQuery.Created = -1;
            break;
          case EVideoSort.Oldest:
            sortQuery.Created = 1;
            break;
          case EVideoSort.MostViewed:
            sortQuery.Views = -1;
            break;
        }
      }

      const totalDocs = await VideoModal.countDocuments(query);
      const videos = await VideoModal.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(pageSize)
        .select(
          "-Content -Summary -Tags -OgUrl -MetaDescription -MetaKeywords -MetaTitle -OgDescription -OgFacebookDescription -OgFacebookImage -OgFacebookTitle -OgTitle -OgxDescription -OgxImage -OgxTitle"
        )
        .populate("CreatedBy", "UserName -_id")
        .populate("UpdatedBy", "UserName -_id")
        .populate("ProjectId", "Title _id");

      if (totalDocs === 0) {
        return NextResponse.json(
          {
            Success: true,
            Message: "Data video not found!",
          },
          { status: 404 }
        );
      }

      const sendVideos = videos.map((video) => ({
        ...video.toObject(),
        ProjectName: video.ProjectId.Title,
        ProjectId: video.ProjectId._id,
        CreatedBy: video.CreatedBy.UserName,
        UpdatedBy: video.UpdatedBy ? video.UpdatedBy.UserName : "",
      }));

      return NextResponse.json(
        {
          Success: true,
          Message: "Successfully",
          Data: sendVideos,
          PageSize: Number(pageSize),
          PageIndex: Number(pageIndex),
          TotalPage: Math.ceil(totalDocs / pageSize),
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
        OldId,
        ProjectId,
        LinkYoutube,
      } = body;

      if (
        !Title ||
        !Thumnail ||
        !Summary ||
        !Content ||
        !ProjectId ||
        !LinkYoutube
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

      const isExisting = await VideoModal.findOne(query);

      if (isExisting) {
        let targetMsg = "";
        if (isExisting.Title.trim() === Title.trim()) {
          targetMsg = "Title";
        }

        if (OldId && isExisting.OldId === OldId) {
          targetMsg = "Old Id";
        }

        if (targetMsg) {
          return NextResponse.json(
            {
              Success: false,
              Message: `${targetMsg} already taken!`,
            },
            { status: 409 }
          );
        }
      }

      const createOgUrl = convertTitleToSlug(Title);

      const newVideo = new VideoModal({
        ...body,
        OgUrl: `/${createOgUrl}`,
        CreatedBy: userId,
        UpdatedBy: userId,
      });

      await newVideo.save();

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Create Video successfully!",
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

      const videoTarget = await VideoModal.findByIdAndDelete(id);

      if (!videoTarget) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Video not found or Deleted!",
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
            Message: "Video id is requirement!",
          }),
          { status: 400 }
        );
      }

      const video = await VideoModal.findById(id);

      if (!video) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Video does not exist!",
          }),
          { status: 404 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Status: true,
          Message: "Successfully!",
          Data: video,
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
        $or: [{ Title: body.Title.trim() }],
        _id: { $ne: body._id },
      };

      if (body.OldId !== "") {
        query.$or.push({ OldId: body.OldId });
      }

      const isExisting = await VideoModal.findOne(query);

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

      const updateVideo = await VideoModal.findByIdAndUpdate(newData._id, {
        $set: {
          ...newData,
          Updated: Date.now(),
          UpdatedBy: userId,
        },
      });

      if (!updateVideo) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Video not found!",
          }),
          { status: 409 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Video updated successfully!",
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

      let target;

      if (isForSEOBoolean) {
        target = await VideoModal.findOne({ OgUrl: `/${code}` }).select(
          "Thumnail  Title  Summary  OgUrl  MetaKeywords  MetaTitle  OgxTitle  OgTitle OgFacebookTitle MetaDescription OgDescription OgxDescription OgFacebookDescription OgFacebookImage OgxImage"
        );
      } else {
        target = await VideoModal.findOneAndUpdate(
          { OgUrl: `/${code}` },
          { $inc: { Views: 1 } },
          { new: true }
        ).select(
          "OldId Thumnail Title _id Content Views Summary ProjectId Tags Created CreatedBy LinkYoutube"
        );
      }

      if (!target) {
        return NextResponse.json(
          {
            Success: false,
            Message: "Video not found!",
          },
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

export default VideoService;
