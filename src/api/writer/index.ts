import BaseAPI from "../method";

const { globalCRUD, put, get } = new BaseAPI("writer");

export const writerAPI = {
  ...globalCRUD,
  updateAvatar: async (data: { NewAvatar: string; id: string }) => {
    return put("/update-avatar", { ...data });
  },
};
