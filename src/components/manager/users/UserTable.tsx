"use client";

import { uploadAPI, userAPI } from "@/api";
import { DataTable, IconButton, UserModal, _format } from "@/components";
import { roleData } from "@/config";
import { updateUser } from "@/store";
import { TColumnsType, TTable } from "@/types/table";
import { handleSplitFileUrl } from "@/utils/frontend/common";
import { Image, Modal, Space } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

type TProps = {
  data: TUser[];
};

export const UserTable: React.FC<TTable<TUser> & TProps> = ({ data, loading }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, watch } = useForm<TCreateUser>({
    mode: "onBlur",
  });

  const handleAfterCallAPI = () => {
    queryClient.invalidateQueries("user-list");
    reset({ _id: "" });
  };

  const mutationUpdate = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (data: TCreateUser) => await userAPI.update(data),
    onSuccess: (res) => {
      handleAfterCallAPI();
      toast.success(res.Message);
      dispatch(updateUser(res.Data as TUser));
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

  const mutationDelete = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id: string) => await userAPI.deleteByID(id),
    onSuccess: (res) => {
      toast.success(res.Message);
      handleAfterCallAPI();
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  })

  const handleUpdateUser = async (newData: TCreateUser) => {
    const { Avatar } = newData;

    if (typeof Avatar !== "string") {
      const imageURL = (await mutationUploadImage.mutateAsync(Avatar as any))
        .Data;
      const sendData = {
        ...watch(),
        Avatar: imageURL,
      };
      
      await mutationUpdate.mutateAsync(sendData);

      const userTarget = data.find((user) => user._id === newData._id);
  
      if (userTarget) {
        const splitUrl = handleSplitFileUrl(userTarget.Avatar)
        const key = splitUrl[1];
        if (key) {
          uploadAPI.deleteImage({ key });
        }
      }
    } else {
      await mutationUpdate.mutateAsync(newData);
    }

  };

  const handleUpdateAndDelete = async (
    record: TUser,
    type = "update"
  ) => {
    if (type === "update") {
      reset({ ...record });
    }

    if (type === "delete") {
      Modal.confirm({
        title: "Delete User?",
        content: "Do you want to delete this User?",
        onOk: async () => {
          await mutationDelete.mutateAsync(record._id)
        },
        onCancel: () => {},
        cancelButtonProps: {
          style: { background: "red", color: "white", border: "none" },
        },
      })
    }
  };

  const columns: TColumnsType<TUser> = [
    {
      dataIndex: "_id",
      title: "No.",
      key: "_id",
      render: (_, __, index) => ++index,
      width: 70,
      fixed: "left"
    },
    {
      dataIndex: "Avatar",
      key: "Avatar",
      title: "Avatar",
      render: (value, record) => {
        return (
          <div className="w-[80px] h-[80px]">
            <Image
              src={value || "/image/image-not-found.png"}
              alt="eco-avatar"
              width={"100%"}
              preview={!!value}
              height={"100%"}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "12px"
              }}
            />
          </div>
        );
      },
    },
    {
      dataIndex: "UserName",
      key: "UserName",
      title: "UserName",
    },
    {
      dataIndex: "RoleID",
      key: "RoleID",
      title: "Position",
      render: (roleId) => {
        return (
          <div>{roleData.find((item) => item.RoleID === roleId)?.RoleName}</div>
        );
      },
    },
    {
      dataIndex: "Email",
      key: "Email",
      title: "Email",
    },
    {
      dataIndex: "Created",
      key: "Created",
      title: "Created",
      render: (_, record) => {
        return (
          <div>
            <span>{_format.getDate(record?.Created)}</span>
          </div>
        );
      },
    },
    {
      dataIndex: "action",
      key: "action",
      title: "",
      width: 120,
      fixed: "right",
      render: (_, record) => {
        return (
          <Space>
            <IconButton
              type="edit"
              onClick={() => handleUpdateAndDelete(record, "update")}
            />
            <IconButton
              type="trash"
              onClick={() => handleUpdateAndDelete(record, "delete")}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} loading={loading} rowKey="_id" />
      <UserModal
        control={control}
        isOpen={!!watch("_id")}
        onCancel={() => {
          reset({ _id: "" });
        }}
        title="update user"
        isLoading={mutationUpdate.isLoading || mutationUploadImage.isLoading}
        onOk={handleSubmit(handleUpdateUser)}
        isUpdate={true}
      />
    </>
  );
};
