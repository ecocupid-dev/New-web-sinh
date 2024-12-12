"use client";

import { uploadAPI, writerAPI } from "@/api";
import { DataTable, IconButton } from "@/components/global";
import { _format } from "@/components/utils";
import { TColumnsType, TTable } from "@/types/table";
import { Image, Modal, Space, Switch } from "antd";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { WriterModal } from "./WriterModal";
import { handleSplitFileUrl } from "@/utils/frontend/common";

type TProps = {
  data: TWriter[];
};

export const WriterTable: React.FC<TTable<TWriter> & TProps> = ({
  data,
  loading,
}) => {
  const queryClient = useQueryClient();

  const { control, reset, handleSubmit, watch } = useForm<TWriter>({
    mode: "onBlur",
  });

  const handleAfterCallAPI = () => {
    queryClient.invalidateQueries("writer-list");
    reset({ _id: "" });
  };

  const mutationUpdate = useMutation({
    mutationKey: ["update-writer"],
    mutationFn: async (data: TWriter) => await writerAPI.update(data),
    onSuccess: (res) => {
      handleAfterCallAPI();
      toast.success(res.Message);
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationUploadImage = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: async (data: any) => await uploadAPI.image(data, "writers"),
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationDelete = useMutation({
    mutationKey: ["delete-writer"],
    mutationFn: async (id: string) => await writerAPI.deleteByID(id),
    onSuccess: (res) => {
      toast.success(res.Message);
      handleAfterCallAPI();
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleUpdateUser = async (newData: TWriter) => {
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

      if (userTarget && userTarget.Avatar) {
        const splitUrl = handleSplitFileUrl(userTarget.Avatar);
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
    record: TWriter,
    type = "update"
  ) => {
    if (type === "update") {
      reset({ ...record });
    }

    if (type === "delete") {
      Modal.confirm({
        title: "Delete Writer?",
        content: "Do you want to delete this Writer?",
        onOk: async () => {
          if (record._id) {
            await mutationDelete.mutateAsync(record._id);
          }
        },
        onCancel: () => {},
        cancelButtonProps: {
          style: { background: "red", color: "white", border: "none" },
        },
      });
    }
  };

  const columns: TColumnsType<TWriter> = [
    {
      dataIndex: "_id",
      title: "No.",
      render: (_, __, index) => ++index,
      fixed: "left",
      width: 80,
    },
    {
      dataIndex: "UserName",
      title: "UserName",
      fixed: "left",
      width: 200,
      render: (username) => (
        <span className="text-[#004737] font-bold">{username}</span>
      ),
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
                borderRadius: "12px",
              }}
            />
          </div>
        );
      },
      width: 120
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
      dataIndex: "CreatedBy",
      title: "Created By",
    },
    {
      dataIndex: "IsPublish",
      title: "Is Active",
      render: (isPublish) => <Switch checked={isPublish} disabled />,
      width: 120,
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
      <DataTable data={data} rowKey="_id" columns={columns} loading={loading}/>
      <WriterModal
        control={control}
        isOpen={!!watch("_id")}
        onCancel={() => {
          reset({ _id: "" });
        }}
        title="update writer"
        isLoading={mutationUpdate.isLoading || mutationUploadImage.isLoading}
        onOk={handleSubmit(handleUpdateUser)}
      />
    </>
  );
};
