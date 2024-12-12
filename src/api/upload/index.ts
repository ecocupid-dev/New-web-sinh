import { UploadFile } from "antd/lib/upload/interface";
import { deleteImage, uploadImage } from "@/utils/frontend/handleImage";

export const uploadAPI = {
  image: async (data: UploadFile, target: string) => {
    // let frmData = new FormData();
    const file = data.originFileObj ?? null;

    if (!file) {
      throw new Error("File is underfined or missing!");
    }

    const fileUrl = (await uploadImage(file)) || "";

    return { Data: fileUrl };

    // frmData.append("image", file, file.name);
    // frmData.append("target", target)

    // return post("/image", frmData, {
    //   headers: {
    //     ["Content-Type"]: "multipart/form-data",
    //   },
    // });
  },
  deleteImage: async (data: { key: string }) => {
    return await deleteImage(data.key);
    // return post("/delete", data);
  },
};
