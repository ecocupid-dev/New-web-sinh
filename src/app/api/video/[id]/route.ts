import VideoService from "@/server/services/video";
import { authoriseDelete, verifyToken } from "@/utils/backend/auth";

export const GET = async (
  request: TMyNextRequest,
  { params }: { params: { id: string } }
) => {
  return verifyToken(request, async () => {
    return VideoService.getById(request, { params });
  });
};

export const DELETE = async (
  request: TMyNextRequest,
  { params }: { params: { id: string } }
) => {
  return verifyToken(request, async () => {
    return authoriseDelete(request, async () => {
      return VideoService.delete(request, { params });
    });
  });
};
