import BaseAPI from "../method";

const { globalCRUD, get } = new BaseAPI("article");

export const articleAPI = {
  ...globalCRUD,
  getByCode: (params: { code: string, isForSEO: boolean }) => get<TArticles>("/get-by-code", { params }),
};
