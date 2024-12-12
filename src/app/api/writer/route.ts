import WriterService from "@/server/services/writer";
import { authoriseEdit, verifyToken } from "@/utils/backend/auth";

export const GET = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return authoriseEdit(request, async () => {
      return WriterService.getList(request);
    });
  });
};

export const POST = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return authoriseEdit(request, async () => {
      return WriterService.create(request);
    });
  });
};

export const PUT = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return authoriseEdit(request, async () => {
      return WriterService.update(request);
    });
  });
};
