"use client";

import { uploadAPI, userAPI } from "@/api";
import { TextButton, UserModal } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Popover } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";
import { UserFilterContent } from "./UserFilterContent";

type TProps = {
  isLoading: boolean;
  handleFilter: (newFilter: TCategoryFilter) => void;
};

const schema = yup
  .object({
    UserName: yup
      .string()
      .trim()
      .required()
      .matches(/^[a-zA-Z]+$/, "Only contain letters and no spaces"),
    Password: yup.string().trim().required(),
    ConfirmPassword: yup
      .string()
      .trim()
      .required()
      .oneOf([yup.ref("Password")], "Passwords must match"),
    Email: yup.string().required().email(),
    RoleID: yup.number().required(),
  })
  .required();

export const UserFilter = ({ isLoading, handleFilter }: TProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultValues = {
    UserName: "",
    Password: "",
    Avatar: "",
    Description: "",
    Email: "",
    LinkedIn: "",
    RoleID: undefined,
    ConfirmPassword: "",
  };

  const { control, reset, handleSubmit, watch } = useForm<TCreateUser>({
    mode: "onBlur",
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const handleRefetchingUser = () => {
    queryClient.invalidateQueries(["user-list"]);
  };

  const handleModalUser = () => {
    setIsOpen(!isOpen);
    reset(defaultValues);
  };

  const mutationCreate = useMutation({
    mutationKey: ["create-new-user"],
    mutationFn: async (data: TCreateUser) => await userAPI.create(data),
    onSuccess: (res) => {
      toast.success(res.Message);
      handleRefetchingUser();
      handleModalUser();
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationUploadImage = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: async (data: any) => await uploadAPI.image(data, "users"),
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleCreateUser = async (data: TCreateUser) => {
    const { Avatar } = data;

    if (typeof Avatar !== "string") {
      const imageURL = (await mutationUploadImage.mutateAsync(Avatar as any))
        .Data;
      const sendData = {
        ...watch(),
        Avatar: imageURL,
      };
      await mutationCreate.mutateAsync(sendData);
    } else {
      await mutationCreate.mutateAsync(data);
    }
  };

  return (
    <div className="mb-4 flex justify-between items-end">
      <div>
        <Popover
          trigger={"click"}
          content={<UserFilterContent handleFilter={handleFilter} />}
          placement="bottomLeft"
        >
          <TextButton text="Filter" classButton="bg-[#f3ffd2] text-[#004737]" />
        </Popover>
      </div>

      <div className="flex gap-2">
        <TextButton
          text="Reload"
          isLoading={isLoading}
          onClick={handleRefetchingUser}
        />
        <TextButton
          text="New User"
          disabled={isLoading}
          onClick={handleModalUser}
          classButton="bg-[#56F09F]"
        />
      </div>

      <UserModal
        control={control}
        isOpen={isOpen}
        onCancel={handleModalUser}
        title="create new user"
        isLoading={mutationCreate.isLoading || mutationUploadImage.isLoading}
        onOk={handleSubmit(handleCreateUser)}
      />
    </div>
  );
};
