import ProjectService from "@/server/services/project";
import { authoriseDelete, verifyToken } from "@/utils/backend/auth";

export const GET = async (
  request: TMyNextRequest,
  { params }: { params: { id: string } }
) => {
  return verifyToken(request, async () => {
    return ProjectService.getById(request, { params });
  });
};

export const DELETE = async (
  request: TMyNextRequest,
  { params }: { params: { id: string } }
) => {
  return verifyToken(request, async () => {
    return authoriseDelete(request, async () => {
      return ProjectService.delete(request, { params });
    });
  });
};
