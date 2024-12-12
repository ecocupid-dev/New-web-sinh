import AuthenService from "@/server/services/authen";

export const POST = async (request: TMyNextRequest) => {
  return AuthenService.create(request);
};
