import CategoryService from "@/server/services/category";
import { authorizeRole, verifyToken } from "@/utils/backend/auth";

export const DELETE = async (
  request: TMyNextRequest,
  { params }: { params: { id: string } }
) => {
  return verifyToken(request, async () => {
    return authorizeRole(request, { params }, async () => {
      return CategoryService.delete(request, { params });
    });
  });
};
