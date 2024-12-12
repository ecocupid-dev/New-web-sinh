"use client";

import { caterogyAPI } from "@/api";
import { CategoryFilter, CategoryTable } from "@/components";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const [filter, setFilter] = useState<TCategoryFilter>({
    PageSize: 10,
    PageIndex: 1,
    TotalPage: 0,
    Total: 0,
    SearchByName: ""
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "category-list",
      [
        filter.PageIndex,
        filter.SearchByName,
        filter?.SearchByName,
        filter?.FromDate,
        filter?.ToDate,
        filter?.Sort,
      ],
    ],
    queryFn: async () => await caterogyAPI.getList(filter),
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

  const handleFilter = (newFilter: TCategoryFilter) => {
    setFilter({
      ...filter,
      ...newFilter,
    });
  };

  return (
    <div>
      <CategoryFilter
        isLoading={isLoading || isFetching}
        handleFilter={handleFilter}
      />
      <CategoryTable
        data={data?.Data}
        loading={isLoading || isFetching}
        pagination={{
          current: filter.PageIndex,
          pageSize: filter.PageSize,
          total: filter.Total,
          onChange: (page) => {
            handleFilter({ PageIndex: page });
          },
        }}
      />
    </div>
  );
};

export default CategoryPage;
