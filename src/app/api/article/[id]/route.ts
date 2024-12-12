import ArticleService from "@/server/services/article";
import { authoriseDelete, verifyToken } from "@/utils/backend/auth";

export const GET = async (
  request: TMyNextRequest,
  { params }: { params: { id: string } }
) => {
  return verifyToken(request, async () => {
    return ArticleService.getById(request, { params });
  });
};

export const DELETE = async (
  request: TMyNextRequest,
  { params }: { params: { id: string } }
) => {
  return verifyToken(request, async () => {
    return authoriseDelete(request, async () => {
      return ArticleService.delete(request, { params });
    });
  });
};
