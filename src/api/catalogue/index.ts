import BaseAPI from "../method";

const { globalCRUD, get } = new BaseAPI("catalogue");

export const catalogueAPI = {
  ...globalCRUD,
  getAllUser: (params: { IsPublish: boolean }) =>
    get("/get-all-user", { params }),
  getAllCaterogy: (params: { IsPublish?: boolean }) =>
    get("/get-all-category", { params }),
  getAllProject: (params: { IsPublish?: boolean }) =>
    get("/get-all-project", { params }),
  getAllWriter: (params: { IsPublish?: boolean }) =>
    get("/get-all-writer", { params }),
};
