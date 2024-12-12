import VideoService from "@/server/services/video";

export const GET = async (request: TMyNextRequest) => {
  return VideoService.getByCode(request);
};
