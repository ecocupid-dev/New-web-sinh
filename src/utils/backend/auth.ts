import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import "dotenv/config.js";

export const verifyToken = async (
  req: any,
  next: () => Promise<NextResponse>
) => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      {
        Success: false,
        Message: "Access token not found!",
      },
      { status: 401 }
    );
  }

  try {
    const decoded: any = jwt.verify(token, process.env.TOKEN_SERCET || "");
    (req as any).userId = decoded._id;
    (req as any).RoleID = decoded.RoleID;

    return await next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        {
          success: false,
          Message: "Your session has expired, please log in again!",
        },
        { status: 401 }
      );
    }
    console.log(error, "=====error========");
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
};

export const authorizeRole = async (
  req: TMyNextRequest,
  { params }: { params: { id: string } },
  next: () => Promise<NextResponse>
) => {
  const { userId, RoleID } = req;
  const paramsId = params.id;
  // const body = await req.json();
  // const bodyId = body.id || body._id;

  // if (userId === paramsId || RoleID === 1 || userId === bodyId) {
  if (userId === paramsId || RoleID === 1) {
    return await next();
  } else {
    return NextResponse.json(
      {
        Success: false,
        Message: "Access denied. You do not have permission!",
      },
      { status: 401 }
    );
  }
};

export const authoriseEdit = async (
  req: TMyNextRequest,
  next: () => Promise<NextResponse>
) => {
  const { RoleID } = req;

  if (RoleID !== 1 && RoleID !== 2) {
    return NextResponse.json(
      {
        Success: false,
        Message: "Access denied. You do not have permission!",
      },
      { status: 401 }
    );
  }

  return await next();
};

export const authoriseDelete = async (
  req: TMyNextRequest,
  next: () => Promise<NextResponse>
) => {
  const { RoleID } = req;

  if (RoleID === 3) {
    return NextResponse.json(
      {
        Success: false,
        Message: "Access denied. You do not have permission!",
      },
      { status: 401 }
    );
  }

  return await next();
};
