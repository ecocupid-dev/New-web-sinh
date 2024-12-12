"use client";
import { userAPI } from "@/api";
import { InputForm, SelectForm, TextAreaForm, TextButton } from "@/components";
import { roleData } from "@/config";
import { updateUser } from "@/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./index.module.scss";

type TProps = {
  data: TUser;
};

export const DetailContent = ({ data }: TProps) => {
  const dispath = useDispatch();

  const { control, reset, handleSubmit } = useForm<TCreateUser>({
    mode: "onBlur",
  });

  const mutationUpdate = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (data: TCreateUser) => await userAPI.update(data),
    onSuccess: (res) => {
      toast.success(res.Message);
      dispath(updateUser(res.Data as TUser));
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleUpdateUser = async (data: TCreateUser) => {
    await mutationUpdate.mutateAsync(data);
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  return (
    <div className={styles["detail-user"]}>
      <div className={styles["detail-user-content"]}>
        <TextButton
          text={"Update"}
          classButton={styles["detail-user-content-button"]}
          onClick={handleSubmit(handleUpdateUser)}
          isLoading={mutationUpdate.isLoading}
        />
        <InputForm
          control={control}
          name="UserName"
          label="UserName"
          placeholder="Enter username"
          disabled={true}
        />
        <InputForm
          control={control}
          name="NewPassword"
          label="New password"
          placeholder="Enter new password"
          disabled={mutationUpdate.isLoading}
        />
        <InputForm
          control={control}
          name="Email"
          label="Email"
          placeholder="Enter email"
          required
          disabled={mutationUpdate.isLoading}
        />
        <SelectForm
          control={control}
          name="RoleID"
          dataOptions={roleData.map((item) => ({
            label: item.RoleName,
            value: item.RoleID,
          }))}
          label="Position"
          placeholder="Select position"
          disabled={true}
        />
        <InputForm
          control={control}
          name="NewPasswordConfirm"
          label="New password confirm"
          placeholder="Enter confirm new password"
          disabled={mutationUpdate.isLoading}
        />
        <InputForm
          control={control}
          name="LinkedIn"
          label="LinkedIn"
          placeholder="Enter linkedIn"
          disabled={mutationUpdate.isLoading}
        />
        <div className="col-span-2">
          <TextAreaForm
            control={control}
            name="Description"
            placeholder="Write some description"
            label="Desciption"
            rows={3}
            disabled={mutationUpdate.isLoading}
          />
        </div>
      </div>
    </div>
  );
};
