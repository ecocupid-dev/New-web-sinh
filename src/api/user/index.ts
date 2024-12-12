import BaseAPI from "../method";

const { globalCRUD, put } = new BaseAPI("user");

export const userAPI = {
  ...globalCRUD,
  updateAvatar: async (data: { NewAvatar: string; id: string }) => {
    return put("/update-avatar", { ...data });
  },
};
