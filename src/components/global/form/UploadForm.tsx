"use client";

import { PlusOutlined } from "@ant-design/icons";
import { GetProp, Image, Upload, UploadFile, UploadProps } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./index.module.scss";
import { uploadAPI } from "@/api";

type TUploadForm<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues, object>;
  name: Path<TFieldValues>;
  target: "user" | "article" | "project" | "videos" | "";
  rules?: RegisterOptions;
  label?: string;
  labelStyles?: string;
  required?: boolean;
  wrapperStyles?: string;
  defaultValue?: string;
  disabled?: boolean;
  fileType?: string | string[];
  mb?: number;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = ["image/jpeg", "image/png", "image/jpg"].includes(
    file.type
  );

  if (!isJpgOrPng) {
    toast.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    toast.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const UploadForm = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  label = "",
  labelStyles,
  wrapperStyles,
  required = false,
  defaultValue = "",
  disabled = false,
  fileType = ["image/jpeg", "image/png"],
  mb = 1,
}: TUploadForm<TFieldValues>) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    control,
    name,
    rules,
  });
  const x = value;

  const [fileList, setFileList] = useState<UploadFile[]>(() => {
    if (!defaultValue) return [];
    return [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: defaultValue,
      },
    ];
  });

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (newFileList[0]) {
      onChange(newFileList[0]);
      setFileList(newFileList);
    } else {
      onChange("");
      setFileList([]);
    }
  };

  useEffect(() => {
    if (!value) {
      setFileList([]);
      return;
    }

    if (value && typeof value === "string") {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: value,
        },
      ]);
    }
  }, [value, x]);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleOnRemove = async (file: UploadFile<any>) => {
    setFileList([]);
    onChange("");
    // if (file.originFileObj) {
    //   console.log("ảnh mới");
    // } else {
    //   if (file.url && file.url.includes("eco-cupid-images")) {
    //     const splitUrl = handleSplitFileUrl(file.url);
    //     const key = splitUrl[1];
    //     await uploadAPI
    //       .deleteImage({ key: key })
    //       .then((res) => toast.success(res.Message))
    //       .catch((error: any) => {
    //         return toast.error(error.Message);
    //       });
    //   }
    // }
  };

  return (
    <>
      <div className={styles["upload-wrapper"]}>
        {label && (
          <label htmlFor={name} className={clsx(styles["label"], labelStyles)}>
            <div className={styles["label-name"]}>{label}</div>
            {required && <span className={styles["label-required"]}>*</span>}
          </label>
        )}
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onRemove={handleOnRemove}
          disabled={disabled}
          onChange={(info) => {
            const typeImage = info.file.type;
            const sizeImage = info.file.size;

            if (typeImage && sizeImage) {
              if (
                fileType.includes(typeImage) &&
                sizeImage / 1024 / 1024 < mb
              ) {
                handleChange(info);
              } else {
                toast.warning("Image size must be less than 1mb")
              }
            }
          }}
          beforeUpload={(file) => beforeUpload(file)}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </div>

      {previewImage && (
        <Image
          alt="image-preview"
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
