import UserService from "@/server/services/user";
import { authorizeRole, verifyToken } from "@/utils/backend/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return UserService.getById(request, { params });
}

export const DELETE = async (
  request: TMyNextRequest,
  { params }: { params: { id: string } }
) => {
  return verifyToken(request, async () => {
    return authorizeRole(request, { params }, async () => {
      return UserService.delete(request, { params });
    });
  });
};
