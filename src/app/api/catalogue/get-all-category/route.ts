import CatalogueService from "@/server/services/catalogue";

export const GET = async (request: TMyNextRequest) => {
  return CatalogueService.getAllCaterogy(request);
};
