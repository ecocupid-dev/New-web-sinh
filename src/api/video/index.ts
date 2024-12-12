import BaseAPI from "../method";

const { globalCRUD, get } = new BaseAPI("video");

export const videoAPI = {
  ...globalCRUD,
  getByCode: (params: { code: string; isForSEO: boolean }) =>
    get<TVideo>("/get-by-code", { params }),
};
