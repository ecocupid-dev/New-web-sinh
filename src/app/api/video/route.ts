import VideoService from "@/server/services/video";
import { verifyToken } from "@/utils/backend/auth";

export const GET = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return VideoService.getAll(request);
  });
};

export const POST = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return VideoService.create(request);
  });
};

export const PUT = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return VideoService.update(request);
  });
};
