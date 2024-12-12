import BaseAPI from "../method";

const { globalCRUD, get } = new BaseAPI("project");

export const projectAPI = {
  ...globalCRUD,
};
