import HomeService from "@/server/services/home";

export const GET = async (request: TMyNextRequest) => {
  return HomeService.getMultipleResources(request);
};
