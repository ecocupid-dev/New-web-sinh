import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { NextResponse } from "next/server";
import connectDB from "@/server/db";
import { UserModel } from "@/server/models/users";
import "dotenv/config.js";

class AuthenService {
  static async login(request: TMyNextRequest) {
    try {
      await connectDB();

      const body = await request.json();

      const { UserName, Password } = body;

      if (!UserName || !Password) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            message: "Missing username and/or password!",
          }),
          { status: 400 }
        );
      }

      const userTarget = await UserModel.findOne({ UserName });

      if (!userTarget) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Username does not exist!",
          }),
          { status: 401 }
        );
      }

      const passwordValid = await argon2.verify(userTarget.Password, Password);

      if (!passwordValid) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Username and/or Password incorrect!",
          }),
          { status: 401 }
        );
      }

      const tokenSercet = process.env.TOKEN_SERCET;
      if (!tokenSercet) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Invalid Token Sercet!",
          }),
          { status: 401 }
        );
      }

      const accessToken = jwt.sign(
        {
          _id: userTarget._id,
          UserName: userTarget.UserName,
          RoleID: userTarget.RoleID,
        },
        tokenSercet,
        {
          expiresIn: "24h",
        }
      );

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Login succesfully!",
          Data: {
            AccessToken: accessToken,
          },
        }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse("Error in fetching users" + error.message, {
        status: 500,
      });
    }
  }

  static async create(request: TMyNextRequest) {
    try {
      await connectDB();

      const body = await request.json();

      const { UserName, Password, Email, LinkedIn, RoleID } = body;

      if (!UserName || !Password || !Email || !RoleID) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            message: "Missing required params!",
          }),
          { status: 400 }
        );
      }

      const isExisting = await UserModel.findOne({
        $or: [{ UserName }, { Email }, { LinkedIn }],
      });

      if (isExisting) {
        let targetMsg = "";
        if (isExisting.UserName === UserName) {
          targetMsg = "UserName";
        }
        if (isExisting.Email === Email) {
          targetMsg = "Email";
        }
        if (isExisting.LinkedIn === LinkedIn) {
          targetMsg = "LinkedIn";
        }

        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: `${targetMsg} already taken!`,
          }),
          { status: 409 }
        );
      }

      const hashedPassword = await argon2.hash(Password);
      const newUser = new UserModel({ ...body, Password: hashedPassword });

      await newUser.save();

      const tokenSercet = process.env.TOKEN_SERCET;
      if (!tokenSercet) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Invalid Token Sercet!",
          }),
          { status: 401 }
        );
      }
      const accessToken = jwt.sign(
        {
          _id: newUser._id,
          UserName: newUser.UserName,
          RoleID: newUser.RoleID,
        },
        tokenSercet,
        {
          expiresIn: "24h",
        }
      );

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Create new User succesfully!",
          Data: {
            AccessToken: `Bearer ${accessToken}`,
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
}

export default AuthenService;
