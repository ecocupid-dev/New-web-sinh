"use client";

import { uploadAPI, videoAPI } from "@/api";
import { DataTable, IconButton } from "@/components/global";
import { _format } from "@/components/utils";
import { TColumnsType, TTable } from "@/types/table";
import { handleSplitFileUrl } from "@/utils/frontend/common";
import { Image, Modal, Space, Switch } from "antd";
import Link from "next/link";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
type TProps = {
  data: TVideo[];
  isLoading: boolean;
};

const ActionButtons = ({ record }: { record: TVideo }) => {
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationKey: ["video-delete"],
    mutationFn: async (id: string) => await videoAPI.deleteByID(id),
    onSuccess: (res) => {
      toast.success(res.Message);
      queryClient.invalidateQueries(["video-list"])
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleDelete = async (data: TVideo) => {
    if (!data._id) return;

    try {
      const { Thumnail, OgxImage, OgFacebookImage } = data;
      const imageDelete = [Thumnail, OgxImage, OgFacebookImage];

      await mutationDelete.mutateAsync(data._id);

      imageDelete.forEach((item: string | undefined) => {
        if (typeof item === "string") {
          const splitUrl = handleSplitFileUrl(item);
          const key = splitUrl[1];
          if (key) {
            uploadAPI.deleteImage({ key });
          }
        }
      })


    } catch (error) {
      toast.error("error in delete image!")
    }
  };

  return (
    <Space>
      <Link href={`/manager/video/${record._id}`}>
        <IconButton type={"edit"} />
      </Link>
      <IconButton
        type="trash"
        onClick={() =>
          Modal.confirm({
            title: "Delete video?",
            content: "Do you want to delete this Video?",
            onOk: () => {
              if (record) {
                handleDelete(record);
              }
            },
            cancelButtonProps: {
              style: { background: "red", color: "white", border: "none" },
            },
          })
        }
      />
    </Space>
  );
};

export const VideoTable: FC<TTable<TVideo> & TProps> = ({
  data,
  isLoading,
}) => {
  const columns: TColumnsType<TVideo> = [
    {
      dataIndex: "_id",
      title: "No.",
      render: (_, __, index) => ++index,
      width: 70,
      fixed: "left"
    },
    {
      dataIndex: "Title",
      title: "Title",
      width: 300,
      fixed: "left",
      render: (title) => <span className="text-[#004737] font-bold">{title}</span>
    },
    {
      dataIndex: "Thumnail",
      title: "Thumnail",
      width: 120,
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
    },
    {
      dataIndex: "ProjectName",
      title: "Project",
      width: 160,
    },
    {
      dataIndex: "Created",
      title: "Created",
      render: (created) => _format.getDate(created),
      width: 200,
    },
    {
      dataIndex: "CreatedBy",
      title: "Created by",
      width: 120,
    },
    {
      dataIndex: "IsFeature",
      title: "Feature",
      render: (isFeature) => <Switch checked={isFeature} disabled />,
      width: 120,
    },
    {
      dataIndex: "IsPublish",
      title: "Publish",
      render: (isPublish) => <Switch checked={isPublish} disabled />,
      width: 120,
    },
    {
      dataIndex: "action",
      width: 120,
      fixed: "right",
      render: (_, record) => <ActionButtons record={record} />,
    },
  ];

  return (
    <DataTable data={data} columns={columns} rowKey="_id" loading={isLoading}  />
  );
};
