import ArticleService from "@/server/services/article";

export const GET = async (request: TMyNextRequest) => {
  return ArticleService.getByCode(request);
};
