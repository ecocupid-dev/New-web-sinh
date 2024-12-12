import WriterService from "@/server/services/writer";
import { authoriseEdit, verifyToken } from "@/utils/backend/auth";

export const GET = async (
  request: TMyNextRequest,
  { params }: { params: { id: string } }
) => {
  return WriterService.getById(request, { params });
};

export const DELETE = async (
  request: TMyNextRequest,
  { params }: { params: { id: string } }
) => {
  return verifyToken(request, async () => {
    return authoriseEdit(request, async () => {
      return WriterService.delete(request, { params });
    });
  });
};
