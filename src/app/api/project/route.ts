import ProjectService from "@/server/services/project";
import { verifyToken } from "@/utils/backend/auth";

export const GET = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return ProjectService.getAll(request);
  });
};

export const POST = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return ProjectService.create(request);
  });
};

export const PUT = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return ProjectService.update(request);
  });
};
