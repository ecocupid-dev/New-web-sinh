import ArticleService from "@/server/services/article";
import { verifyToken } from "@/utils/backend/auth";

export const GET = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return ArticleService.getAll(request);
  });
};

export const POST = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return ArticleService.create(request);
  });
};

export const PUT = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return ArticleService.update(request);
  });
};
