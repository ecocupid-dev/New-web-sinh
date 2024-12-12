"use client";

import { TextButton } from "@/components/global";
import { Popover } from "antd";
import Link from "next/link";
import { useQueryClient } from "react-query";
import { VideoFilterContent } from "./VideoFilterContent";

type TProps = {
  isLoading: boolean;
  handleFilter: (newFilter: TVideoFilter) => void;
};

export const VideoFilter = ({ isLoading, handleFilter }: TProps) => {
  const queryClient = useQueryClient();

  const handleRefetchingVideo = () =>
    queryClient.invalidateQueries(["video-list"]);

  return (
    <div className="mb-4 flex justify-between items-center">
      <div>
        <Popover
          trigger={"click"}
          content={<VideoFilterContent handleFilter={handleFilter} />}
          placement="bottomLeft"
        >
          <TextButton text="Filter" classButton="bg-[#f3ffd2] text-[#004737]" />
        </Popover>
      </div>

      <div className="flex gap-2">
        <TextButton
          text="Reload"
          isLoading={isLoading}
          onClick={handleRefetchingVideo}
        />
        <Link href={"/manager/video/create-new"}>
          <TextButton
            text="New Video"
            disabled={isLoading}
            classButton="bg-[#56F09F]"
          />
        </Link>
      </div>
    </div>
  );
};
