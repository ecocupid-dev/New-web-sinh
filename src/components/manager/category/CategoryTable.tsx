"use client";

import { caterogyAPI } from "@/api";
import { CategoryModal, DataTable, IconButton } from "@/components";
import { TColumnsType, TTable } from "@/types/table";
import { Modal, Space, Switch, TablePaginationConfig } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

type TProps = {
  data: TCategory[];
  pagination: TablePaginationConfig;
  loading: boolean;
};

export const CategoryTable: React.FC<TTable<TCategory> & TProps> = ({
  data,
  pagination,
  loading,
}) => {
  const { control, reset, watch, handleSubmit } = useForm<TCreateCategory>({
    mode: "onBlur",
  });

  const queryClient = useQueryClient();

  const handleAfterCallAPI = () => {
    queryClient.invalidateQueries("category-list");
    reset({ _id: "" });
  };

  const mutationUpdate = useMutation({
    mutationKey: ["update-category"],
    mutationFn: async (data: TCreateCategory) => await caterogyAPI.update(data),
    onSuccess: (res) => {
      toast.success(res.Message);
      handleAfterCallAPI();
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationDelete = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async (id: string | number) => await caterogyAPI.deleteByID(id),
    onSuccess: (res) => {
      toast.success(res.Message);
      handleAfterCallAPI();
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleUpdateCategory = async (data: TCreateCategory) => {
    mutationUpdate.mutateAsync(data);
  };

  const handleUpdateAndDelete = async (
    record: TCategory,
    type = "update" || "delete"
  ) => {
    if (type === "update") {
      reset({ ...record });
    }

    if (type === "delete") {
      Modal.confirm({
        title: "Delete Cateroy?",
        content: "Do you want to delete this Category?",
        onOk: () => {
          mutationDelete.mutateAsync(record._id);
        },
        onCancel: () => {},
        cancelButtonProps: {
          style: { background: "red", color: "white", border: "none" },
        },
      });
    }
  };

  const columns: TColumnsType<TCategory> = [
    {
      dataIndex: "action",
      key: "action",
      title: "No.",
      render: (_, __, index) => ++index,
      width: 70,
      fixed: "left",
    },
    {
      dataIndex: "Name",
      title: "Name",
      key: "Name",
      render: (name) => (
        <span className="text-[#004737] font-bold">{name}</span>
      ),
      fixed: "left",
      width: 200,
    },
    {
      dataIndex: "Color",
      title: "Color",
      key: "Color",
      render: (color) => (
        <div style={{ background: color }} className={`w-6 h-6 rounded-sm`} />
      ),
      width: 90,
    },
    {
      dataIndex: "Articles",
      title: "Articles",
      key: "Articles",
      width: 120,
    },
    {
      dataIndex: "IsFeature",
      title: "Feature",
      render: (isFeature) => <Switch checked={isFeature} disabled />,
      width: 120,
    },
    {
      dataIndex: "Description",
      key: "Description",
      title: "Description",
    },
    {
      dataIndex: "CreatedBy",
      key: "CreatedBy",
      title: "Created by",
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
      key: "action",
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
      <DataTable
        data={data}
        columns={columns}
        pagination={pagination}
        loading={loading}
        rowKey="_id"
      />
      <CategoryModal
        control={control}
        isOpen={!!watch("_id")}
        onOk={handleSubmit(handleUpdateCategory)}
        isLoading={mutationUpdate.isLoading}
        title={"update category"}
        onCancel={() => {
          reset({ _id: "" });
        }}
        type="update"
      />
    </>
  );
};
