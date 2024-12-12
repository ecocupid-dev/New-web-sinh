import { EWriterSort } from "@/enum/writer";
import { NextResponse } from "next/server";
import connectDB from "../db";
import { WriterModel } from "../models/writer";

class WriterService {
  static async getList(request: TMyNextRequest) {
    try {
      await connectDB();

      // Lấy query params từ URL
      const { searchParams } = request.nextUrl;
      const searchByName = searchParams.get("SearchByName") || "";
      const isPublish = searchParams.get("IsPublish");
      const fromDate = searchParams.get("FromDate");
      const toDate = searchParams.get("ToDate");
      const sort = searchParams.get("Sort");

      const pageIndex = searchParams.get("PageIndex") || 1;
      const pageSize = searchParams.get("PageSize") || 20;

      const skip = (pageIndex - 1) * pageSize;

      let query: any = {};
      let sortQuery: any = {};

      if (isPublish !== undefined && isPublish !== null) {
        query.IsPublish = isPublish;
      }
      if (searchByName) {
        query.UserName = { $regex: searchByName, $options: "i" };
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
          case EWriterSort.Newest:
            sortQuery.Created = -1;
            break;
          case EWriterSort.Oldest:
            sortQuery.Created = 1;
            break;
        }
      }

      const totalPage = await WriterModel.countDocuments(query);
      const writes = await WriterModel.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(pageSize)
        .populate("CreatedBy", "UserName -_id");

      const sendWrites = writes.map((item) => {
        const rs = {
          _id: item._id,
          UserName: item.UserName,
          Email: item.Email,
          RoleID: item.RoleID,
          Avatar: item.Avatar,
          Description: item.Description,
          LinkedIn: item.LinkedIn,
          Created: item.Created,
          CreatedBy: item.CreatedBy.UserName,
          IsPublish: item.IsPublish,
        };
        return rs;
      });

      return NextResponse.json(
        {
          Success: true,
          Message: "Successfully!",
          Data: sendWrites,
          PageSize: Number(pageSize),
          PageIndex: Number(pageIndex),
          TotalPage: Math.ceil(totalPage / pageSize),
          Total: totalPage,
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

      const { UserName, Email, LinkedIn, Avatar, Description, IsPublish } =
        body;

      if (!UserName) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Missing required params!",
          }),
          { status: 400 }
        );
      }

      const query: any = {
        $or: [{ UserName: UserName }, { Email: Email }],
      };

      if (LinkedIn !== "") {
        query.$or.push({ LinkedIn: LinkedIn });
      }

      const isExisting = await WriterModel.findOne(query);

      if (isExisting) {
        let targetMsg = "";
        if (isExisting.UserName === UserName) {
          targetMsg = "UserName";
        }
        if (isExisting.Email === Email) {
          targetMsg = "Email";
        }

        if (LinkedIn && isExisting.LinkedIn === LinkedIn) {
          targetMsg = "LinkedIn";
        }

        if (targetMsg) {
          return NextResponse.json(
            {
              Success: false,
              Message: `${targetMsg} already taken!`,
            },
            { status: 200 }
          );
        }
      }

      const newWriter = new WriterModel({
        UserName: UserName,
        Email: Email,
        LinkedIn: LinkedIn,
        Avatar: Avatar,
        Description: Description,
        CreatedBy: userId,
        IsPublish: IsPublish,
      });

      await newWriter.save();

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Create new User succesfully!",
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

      const deletedUser = await WriterModel.findOneAndDelete({ _id: id });

      if (!deletedUser) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Writer not found or user not authorised!",
          }),
          { status: 401 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Delete Writer successfully!",
          Data: deletedUser,
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

      const writerTarget = await WriterModel.findById({ _id: id });

      if (!writerTarget) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Writer not found!",
          }),
          { status: 401 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Delete Writer successfully!",
          Data: writerTarget,
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

      const { UserName, Email, LinkedIn, Avatar, Description, _id, IsPublish } =
        body;

      if (!UserName || !Email) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Missing required params!",
          }),
          { status: 400 }
        );
      }

      // kiểm tra xem thông tin mới có trùng không
      const query = {
        _id: { $ne: _id },
        $or: [{ UserName: UserName }, { Email: Email }, { LinkedIn: LinkedIn }],
      };

      if (LinkedIn) {
        query.$or.push({ LinkedIn: LinkedIn });
      }

      const isExisting = await WriterModel.findOne(query);

      if (isExisting) {
        let targetMsg = "";
        if (isExisting.UserName === UserName) {
          targetMsg = "UserName";
        }
        if (isExisting.Email === Email) {
          targetMsg = "Email";
        }

        if (LinkedIn && isExisting.LinkedIn === LinkedIn) {
          targetMsg = "LinkedIn";
        }

        if (targetMsg) {
          return new NextResponse(
            JSON.stringify({
              Success: false,
              Message: `${targetMsg} already taken!`,
            }),
            { status: 200 }
          );
        }
      }

      let updateUser = {
        UserName: UserName,
        Email: Email,
        LinkedIn: LinkedIn,
        Avatar: Avatar,
        Description: Description,
        CreatedBy: userId,
        Updated: Date.now(),
        UpdatedBy: userId,
        IsPublish: IsPublish,
      };

      const newUpdate = await WriterModel.findByIdAndUpdate(
        _id,
        { $set: updateUser },
        { new: true }
      );

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Update Writer succesfully!",
          Data: newUpdate,
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

export default WriterService;
