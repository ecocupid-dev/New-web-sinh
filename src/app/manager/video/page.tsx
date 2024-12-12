"use client";

import { videoAPI } from "@/api";
import { VideoFilter, VideoTable } from "@/components";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const VideoPage = () => {
  const [filter, setFilter] = useState<TVideoFilter>({
    PageSize: 10,
    PageIndex: 1,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "video-list",
      [
        filter.PageIndex,
        filter?.SearchByName,
        filter?.FromDate,
        filter?.ToDate,
        filter?.Sort,
      ],
    ],
    queryFn: async () => await videoAPI.getList(filter),
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

  const handleFilter = (newFilter: TVideoFilter) => {
    setFilter({
      ...filter,
      ...newFilter,
    });
  };

  return (
    <div>
      <VideoFilter
        isLoading={isFetching || isLoading}
        handleFilter={handleFilter}
      />
      <VideoTable data={data?.Data} isLoading={isFetching || isLoading} />
    </div>
  );
};

export default VideoPage;
