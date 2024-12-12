"use client";

import { articleAPI } from "@/api";
import { ArticleFilter, ArticleTable } from "@/components";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const ArticlesPage = () => {
  const [filter, setFilter] = useState<TArticleFilter>({
    PageSize: 10,
    PageIndex: 1,
    // IsPublish: true
  });

  const depencies = [
    filter.PageIndex,
    filter.PageSize,
    filter.CategoryId,
    filter.CountryId,
    filter.FromDate,
    filter.ToDate,
    filter.Title,
    filter.IsMostImpactful,
    filter.IsNewest,
    filter.IsOldest,
  ]

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["article-list", depencies],
    queryFn: async () => await articleAPI.getList(filter),
    onSuccess: (res) => {
      setFilter({
        ...filter,
        TotalPage: res.TotalPage,
        Total: res.Total,
      });
      return res;
    },
    onError: (error: any) => toast.error(error.Message),
    staleTime: 15000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleFilter = (newFilter: TArticleFilter) => {
    setFilter({
      ...filter,
      ...newFilter,
    });
  };

  return (
    <div>
      <ArticleFilter
        isLoading={isFetching || isLoading}
        handleFilter={handleFilter}
      />
      <ArticleTable data={data?.Data} loading={isFetching || isLoading} />
    </div>
  );
};

export default ArticlesPage;
