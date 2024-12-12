"use client";

import { projectAPI } from "@/api";
import { ProjectFilter, ProjectTable } from "@/components";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const ProjectPage = () => {
  const [filter, setFilter] = useState<TProjectFilter>({
    PageSize: 10,
    PageIndex: 1,
    TotalPage: 0,
    Total: 0
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "project-list",
      [
        filter.PageIndex,
        filter.SearchByName,
        filter.CountryId,
        filter.IsPublish,
        filter?.FromDate,
        filter?.ToDate,
        filter?.Sort,
      ],
    ],
    queryFn: async () => await projectAPI.getList(filter),
    onSuccess: (res) => {
      setFilter({
        ...filter,
        TotalPage: res.TotalPage,
        Total: res.Total,
      });
      return res.Data;
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
    staleTime: 15000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  const handleFilter = (newFilter: TProjectFilter) => {
    setFilter({
      ...filter,
      ...newFilter,
    });
  };

  return (
    <div>
      <ProjectFilter
        isLoading={isLoading || isFetching}
        handleFilter={handleFilter}
      />
      <ProjectTable
        data={data?.Data || []}
        pagination={{
          current: filter.PageIndex,
          pageSize: filter.PageSize,
          total: filter.Total,
          onChange: (page) => {
            handleFilter({ PageIndex: page });
          },
        }}
        loading={isLoading}
      />
    </div>
  );
};

export default ProjectPage;
