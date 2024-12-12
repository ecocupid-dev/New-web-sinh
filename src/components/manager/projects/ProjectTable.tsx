"use client";

import { DataTable } from "@/components";
import { countryList } from "@/config";
import { TColumnsType, TTable } from "@/types/table";
import { Image, Space, Switch, TablePaginationConfig } from "antd";
import React from "react";
import { ActionComponents } from "./ActionButtonTable";

type TProps = {
  data: TProject[];
  loading: boolean;
  pagination: TablePaginationConfig;
};

export const ProjectTable: React.FC<TTable<TProject> & TProps> = ({
  data,
  loading,
  pagination,
}) => {
  const columns: TColumnsType<TProject> = [
    {
      dataIndex: "_id",
      title: "No.",
      render: (_, __, index) => ++index,
      fixed: "left",
      width: 70,
    },
    {
      dataIndex: "Title",
      title: "Title",
      fixed: "left",
      width: 300,
      render: (title) => <span className="text-[#004737] font-bold">{title}</span>
    },
    {
      dataIndex: "Image",
      title: "Image",
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
      dataIndex: "Articles",
      title: "Articles",
      width: 160,
    },
    {
      dataIndex: "Videos",
      title: "Videos",
      width: 160,
    },
    {
      dataIndex: "CountryId",
      title: "Country",
      render: (value) => {
        const countryTarget = countryList.find((item) => item.Id === value);
        return (
          <Space>
            {value ? (
              <>
                <Image
                  alt="eco-country-flag"
                  src={countryTarget?.FlagImage}
                  width={"20px"}
                  preview={false}
                />
                <div>{countryTarget?.Name}</div>
              </>
            ) : (
              <div>none</div>
            )}
          </Space>
        );
      },
      width: 200,
    },
    {
      dataIndex: "IsPublish",
      title: "Is Publish",
      render: (isPublish) => <Switch checked={isPublish} disabled />,
      width: 120,
    },
    {
      dataIndex: "CreatedBy",
      title: "Created By",
      width: 120
    },
    {
      dataIndex: "action",
      width: 120,
      fixed: "right",
      render: (_, record) => <ActionComponents record={record} />,
    },
  ];

  return (
    <>
      <DataTable
        rowKey="_id"
        data={data}
        columns={columns}
        pagination={pagination}
        loading={loading}
        scroll={{x: 1200}}
      />
    </>
  );
};
