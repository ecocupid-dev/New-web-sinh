import { EUserSort } from "@/enum/user";
import argon2 from "argon2";
import { NextResponse } from "next/server";
import connectDB from "../db";
import { UserModel } from "../models/users";

class UserService {
  static async getById(
    request: TMyNextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      await connectDB();
      const { id } = params;

      if (!id) {
        return NextResponse.json(
          {
            Success: false,
            Message: "UserID is requirement!",
          },
          { status: 400 }
        );
      }

      const user = await UserModel.findById(id);

      if (!user) {
        return NextResponse.json(
          { Success: false, Message: "UserID does not exist!" },
          { status: 404 }
        );
      }

      const userData = {
        _id: user._id,
        UserName: user.UserName,
        Email: user.Email,
        RoleID: user.RoleID,
        Avatar: user.Avatar,
        Description: user.Description,
        LinkedIn: user.LinkedIn,
        Created: user.Created,
      };

      return NextResponse.json(
        {
          Success: true,
          Message: "Successfully!",
          Data: userData,
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

  static async getList(request: TMyNextRequest) {
    try {
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
          case EUserSort.Newest:
            sortQuery.Created = -1;
            break;
          case EUserSort.Oldest:
            sortQuery.Created = 1;
            break;
        }
      }

      const totalPage = await UserModel.countDocuments();
      const users = await UserModel.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(pageSize)
        .select("-Password");

      const resUsers = users.map((item) => {
        const rs = {
          _id: item._id,
          UserName: item.UserName,
          Email: item.Email,
          RoleID: item.RoleID,
          Avatar: item.Avatar,
          Description: item.Description,
          LinkedIn: item.LinkedIn,
          Created: item.Created,
          CreateBy: "Admin", // lúc nào cũng là admin tạo tk mối nên chổ này handle cứng
        };
        return rs;
      });

      return NextResponse.json(
        {
          Success: true,
          Message: "Successfully!",
          Data: resUsers,
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

      const {
        UserName,
        Password,
        Email,
        RoleID,
        LinkedIn,
        Avatar,
        Description,
      } = body;

      if (!UserName || !Password || !Email || !RoleID) {
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

      const isExisting = await UserModel.findOne(query);

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
            { status: 409 }
          );
        }
      }

      const hashedPassword = await argon2.hash(Password);
      const newUser = new UserModel({
        UserName: UserName,
        Password: hashedPassword,
        Email: Email,
        RoleID: RoleID,
        LinkedIn: LinkedIn,
        Avatar: Avatar,
        Description: Description,
        CreatedBy: userId,
      });

      await newUser.save();

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

      const deletedUser = await UserModel.findOneAndDelete({ _id: id });

      if (!deletedUser) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "User not found or user not authorised!",
          }),
          { status: 200 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Delete user successfully!",
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

  static async update(request: TMyNextRequest) {
    try {
      const { userId } = request;

      await connectDB();

      const body = await request.json();

      const {
        UserName,
        NewPassword,
        Email,
        RoleID,
        LinkedIn,
        Avatar,
        Description,
        _id,
      } = body;

      if (!UserName || !Email || !RoleID) {
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

      const isExisting = await UserModel.findOne(query);

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
            { status: 409 }
          );
        }
      }

      let updateUser: any = {
        UserName: UserName,
        Email: Email,
        LinkedIn: LinkedIn,
        Avatar: Avatar,
        Description: Description,
        CreatedBy: userId,
        Updated: Date.now(),
        UpdatedBy: userId,
      };

      if (NewPassword) {
        const hashedPassword = await argon2.hash(NewPassword);
        updateUser.Password = hashedPassword;
      }

      const newUpdate = await UserModel.findByIdAndUpdate(
        _id,
        { $set: updateUser },
        { new: true }
      ).select("-Password");

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Update User succesfully!",
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

  static async updateAvatar(request: TMyNextRequest) {
    try {
      const { userId } = request;

      await connectDB();

      const body = await request.json();

      const { NewAvatar, id } = body;

      const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: { Avatar: NewAvatar },
        },
        { new: true }
      ).select("-Password");

      if (!updatedUser) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "User not found!",
          }),
          { status: 409 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Avatar updated successfully",
          Data: updatedUser,
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

export default UserService;
