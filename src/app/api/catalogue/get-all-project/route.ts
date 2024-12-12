import CatalogueService from "@/server/services/catalogue";
import { verifyToken } from "@/utils/backend/auth";

export const GET = async (request: TMyNextRequest) => {
  return verifyToken(request, async () => {
    return CatalogueService.getAllProjects(request);
  });
};
