"use client";
import { uploadAPI, userAPI } from "@/api";
import { ModalForm, UploadForm } from "@/components";
import { updateUser } from "@/store";
import { Button, Image } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./index.module.scss";
import { handleSplitFileUrl } from "@/utils/frontend/common";

type TProps = {
  defaultAvatar: string;
  userId: string;
};

const useSequentialApiCalls = () => {
  return useMutation(async (data: { file: any; id: string }) => {
    try {
      const res = await uploadAPI.image(data.file as any, "users");
      const newAvatarURL = res.Data;
      const newUserInfo = await userAPI.updateAvatar({
        NewAvatar: newAvatarURL,
        id: data.id,
      });
      return newUserInfo.Data;
    } catch (error: any) {
      toast.error(error.Message)
    }
  });
};

export const DetailHeader = ({ defaultAvatar, userId }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<{ file: UploadFile }>({
    mode: "onBlur",
  });

  const handleToggleModal = () => setIsOpen(!isOpen);

  const { mutateAsync, isLoading } = useSequentialApiCalls();

  const handleUpdateAvatar = async (data: { file: UploadFile }) => {
    try {
      const newUserInfo = await mutateAsync({ file: data.file, id: userId });
      dispatch(updateUser(newUserInfo));
      handleToggleModal()

      if (defaultAvatar) {
        const splitUrl = handleSplitFileUrl(defaultAvatar);
        const key = splitUrl[1];
        if (key) {
          uploadAPI.deleteImage({ key });
        }
      }
    } catch (error: any) {
      console.log("handleUpdateAvatar error: ", error);
      toast.error(error.Message);
    }
  };

  return (
    <div className={styles["detail-user-header"]}>
      <div className={styles["detail-user-header-image"]}>
        <Image
          src={"/image/login-bg.png"}
          alt="eco-user-image"
          preview={false}
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </div>
      <div className={styles["detail-user-header-avatar"]}>
        <div className={styles["detail-user-header-avatar-image"]}>
          <Image
            src={defaultAvatar ||"/image/image-not-found.png"}
            alt="eco-user-avatar"
            preview={false}
            width={"100%"}
            height={"100%"}
            style={{
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
        </div>
        <Button
          className={styles["detail-user-header-avatar-icon"]}
          onClick={handleToggleModal}
        >
          <Image
            src={"/func/edit.svg"}
            alt="eco-user-icon"
            preview={false}
            width={"100%"}
            height={"100%"}
            style={{
              objectFit: "contain",
            }}
          />
        </Button>
      </div>

      <ModalForm
        open={isOpen}
        onOk={handleSubmit(handleUpdateAvatar)}
        onCancel={handleToggleModal}
        title={"Update Avatar"}
        size={{
          maxWidth: "300px",
        }}
        loading={isLoading}
      >
        <UploadForm
          control={control}
          name="file"
          label="Update avatar"
          target={"user"}
        />
      </ModalForm>
    </div>
  );
};
