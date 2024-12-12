"use client";

import { userAPI, writerAPI } from "@/api";
import { UserFilter, UserTable, WriterFilter, WriterTable } from "@/components";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const WriterPage = () => {
  const [filter, setFilter] = useState<TWriterFilter>({
    PageSize: 10,
    PageIndex: 1,
    TotalPage: 0,
    Total: 0,
    SearchByName: ""
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "writer-list",
      [
        filter.PageIndex,
        filter.SearchByName,
        filter?.SearchByName,
        filter?.FromDate,
        filter?.ToDate,
        filter?.Sort,
      ],
    ],
    queryFn: async () => await writerAPI.getList(filter),
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

  const handleFilter = (newFilter: TWriterFilter) => {
    setFilter({
      ...filter,
      ...newFilter,
    });
  };

  return (
    <div>
      <WriterFilter
        isLoading={isLoading || isFetching}
        handleFilter={handleFilter}
      />
      <WriterTable data={data?.Data} loading={isLoading || isFetching} />
    </div>
  );
};

export default WriterPage;
