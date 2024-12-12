import UploadService from "@/server/services/upload";
import { verifyToken } from "@/utils/backend/auth";

export const POST = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return UploadService.deleteImage(request);
  });
};
