import dotenv from "dotenv";
dotenv.config();

export const handleSplitFileUrl = (fileUrl: string = "") => {
  return fileUrl.split(`${process.env.NEXT_PUBLIC_PREFIX_R2_URL}/`);
};
