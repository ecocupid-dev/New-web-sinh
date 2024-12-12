import CategoryService from "@/server/services/category";
import { authorizeRole, verifyToken } from "@/utils/backend/auth";

export const GET = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return authorizeRole(request, { params: { id: "" } }, async () => {
      return CategoryService.getAll(request);
    });
  });
};

export const POST = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return authorizeRole(request, { params: { id: "" } }, async () => {
      return CategoryService.create(request);
    });
  });
};

export const PUT = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return authorizeRole(request, { params: { id: "" } }, async () => {
      return CategoryService.update(request);
    });
  });
};
