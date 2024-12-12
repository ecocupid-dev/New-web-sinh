import UploadService from "@/server/services/upload";
import { verifyToken } from "@/utils/backend/auth";
import { NextApiResponse } from "next";

export const POST = async (request: TMyNextRequest, res: NextApiResponse) => {
  return verifyToken(request, async () => {
    return UploadService.uploadImage(request, res);
  });
};
