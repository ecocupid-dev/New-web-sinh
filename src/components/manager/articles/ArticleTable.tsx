"use client";

import { DataTable, IconButton, _format } from "@/components";
import { TColumnsType, TTable } from "@/types/table";
import React from "react";
import { Image, Modal, Space, Switch } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { articleAPI, uploadAPI } from "@/api";
import { toast } from "react-toastify";
import Link from "next/link";
import { handleSplitFileUrl } from "@/utils/frontend/common";

type TProps = {
  data: TArticles[];
  loading: boolean
};

const ActionButtons = ({ record }: { record: TArticles }) => {
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationKey: ["article-delete"],
    mutationFn: async (id: string) => await articleAPI.deleteByID(id),
    onSuccess: (res) => {
      toast.success(res.Message);
      queryClient.invalidateQueries(["article-list"]);
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleDelete = async (data: TArticles) => {
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
      });
    } catch (error) {
      toast.error("error in delete image!");
    }
  };

  return (
    <Space>
      <Link href={`/manager/articles/${record._id}`} target="_blank">
        <IconButton type={"edit"} />
      </Link>
      <IconButton
        type="trash"
        onClick={() =>
          Modal.confirm({
            title: "Delete articles?",
            content: "Do you want to delete this Article?",
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

export const ArticleTable: React.FC<TTable<TArticles> & TProps> = ({
  data,
  loading,
}: TProps) => {
  const columns: TColumnsType<TArticles> = [
    {
      dataIndex: "_id",
      key: "_id",
      title: "No",
      render: (_, __, index) => ++index,
      fixed: "left",
      width: 70,
    },
    {
      dataIndex: "Title",
      title: "Title",
      fixed: "left",
      width: 300,
      render: (title) => (
        <span className="text-[#004737] font-bold">{title}</span>
      ),
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
      dataIndex: "CategoryName",
      title: "Category",
      width: 160,
    },
    {
      dataIndex: "WriterName",
      title: "Writer",
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
      fixed: "right",
      width: 120,
      render: (_, record) => <ActionButtons record={record} />,
    },
  ];

  return (
    <DataTable columns={columns} data={data} rowKey="_id" loading={loading} />
  );
};
