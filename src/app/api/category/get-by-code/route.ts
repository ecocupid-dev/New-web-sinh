import CategoryService from "@/server/services/category";

export const GET = async (request: TMyNextRequest) => {
  return CategoryService.getByCode(request);
};
