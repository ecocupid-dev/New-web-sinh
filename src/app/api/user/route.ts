import UserService from "@/server/services/user";
import { authorizeRole, verifyToken } from "@/utils/backend/auth";

export const GET = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return authorizeRole(request, { params: { id: "" } }, async () => {
      return UserService.getList(request);
    });
  });
};

export const POST = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return authorizeRole(request, { params: { id: "" } }, async () => {
      return UserService.create(request);
    });
  });
};

export const PUT = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return authorizeRole(request, { params: { id: "" } }, async () => {
      return UserService.update(request);
    });
  });
};
