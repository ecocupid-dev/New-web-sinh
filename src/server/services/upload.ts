import { s3Client } from "@/utils/backend/s3Client";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { upload } from "@/utils/backend/upload";
import { NextApiResponse } from "next";

class UploadService {
  static async uploadImage(request: TMyNextRequest, res: NextApiResponse) {
    try {
      upload.single("image")

      const { file } = request;

      // Đang bug ở đoạn const body = await request.json() này
      const body = await request.json();
      
      const { target } = body;

      if (!target) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Missing name folder parameter",
          }),
          { status: 400 }
        );
      }

      const fileKey = `${target}/${Date.now().toString()}_${file.originalname}`;

      const uploadParams = {
        Bucket: process.env.S3_BUCKET,
        Key: fileKey,
        Body: file.buffer,
        // ACL: "public-read",
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${fileKey}`;

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Image uploaded successfully",
          Data: imageUrl,
        }),
        { status: 200 }
      );
    } catch (error: any) {
      console.log(error, "========error=========");
      return new NextResponse(
        JSON.stringify({
          Success: false,
          Message: "Internal server error!",
        }),
        { status: 500 }
      );
    }
  }

  static async deleteImage(request: TMyNextRequest) {
    try {
      const body = await request.json();
      const { key } = body;

      if (!key) {
        return new NextResponse(
          JSON.stringify({
            Success: false,
            Message: "Missing required fields: key",
          }),
          { status: 400 }
        );
      }

      const deleteParams = {
        Bucket: process.env.S3_BUCKET,
        Key: key,
      };

      const command = new DeleteObjectCommand(deleteParams);
      await s3Client.send(command);

      return new NextResponse(
        JSON.stringify({
          Success: true,
          Message: "Image deleted successfully",
        }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse(
        JSON.stringify({
          Success: false,
          Message: "Failed to delete image",
        }),
        { status: 500 }
      );
    }
  }
}

export default UploadService;
