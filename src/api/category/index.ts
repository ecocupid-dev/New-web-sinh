import BaseAPI from "../method";

const { globalCRUD, get } = new BaseAPI("category");

export const caterogyAPI = {
  ...globalCRUD,
  getByCode: (params: { code: string }) =>
    get<THomeCategory>("/get-by-code", { params }),
};
