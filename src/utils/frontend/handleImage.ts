import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const r2 = new AWS.S3({
  endpoint: `https://${process.env.NEXT_PUBLIC_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: process.env.NEXT_PUBLIC_CLOUD_R2_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_CLOUD_R2_SECRET_KEY,
  region: "auto", // Cloudflare R2 không yêu cầu region cụ thể
});

export const uploadImage = async (file: any) => {
  const fileKey = `${Date.now()}-${file.name}`; // Unique file name

  try {
    await r2
      .putObject({
        Bucket: process.env.NEXT_PUBLIC_CLOUD_R2_BUCKET || "",
        Key: fileKey,
        Body: file,
        ContentType: file.type,
      })
      .promise();

    const fileUrl = `${process.env.NEXT_PUBLIC_PREFIX_R2_URL}/${fileKey}`;

    return fileUrl;
  } catch (error) {
    console.log(error, "====error=====");
  }
};

export const deleteImage = async (key: string) => {
  try {
    await r2
      .deleteObject({
        Bucket: process.env.NEXT_PUBLIC_CLOUD_R2_BUCKET || "",
        Key: key,
      })
      .promise();
  } catch (error) {
    console.log(error, "====error=====");
  }
};
