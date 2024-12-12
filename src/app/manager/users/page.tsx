"use client";

import { userAPI } from "@/api";
import { UserFilter, UserTable } from "@/components";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const UsersPage = () => {
  const [filter, setFilter] = useState<TUserFilter>({
    PageSize: 10,
    PageIndex: 1,
    TotalPage: 0,
    Total: 0,
    SearchByName: "",
    RoleID: undefined,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "user-list",
      [
        filter.PageIndex,
        filter.SearchByName,
        filter?.SearchByName,
        filter?.FromDate,
        filter?.ToDate,
        filter?.Sort,
      ],
    ],
    queryFn: async () => await userAPI.getList(filter),
    onSuccess: (res) => {
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

  const handleFilter = (newFilter: TUserFilter) => {
    setFilter({
      ...filter,
      ...newFilter,
    });
  };

  return (
    <div>
      <UserFilter
        isLoading={isLoading || isFetching}
        handleFilter={handleFilter}
      />
      <UserTable data={data?.Data} loading={isLoading || isFetching} />
    </div>
  );
};

export default UsersPage;
