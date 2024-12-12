"use client";

import { TextButton } from "@/components/global";
import { Popover } from "antd";
import Link from "next/link";
import React from "react";
import { useQueryClient } from "react-query";
import { ArticleFilterContent } from "./ArticleFilterContent";

type TProps = {
  isLoading: boolean;
  handleFilter: (newFilter: TArticleFilter) => void;
};

export const ArticleFilter = ({ isLoading, handleFilter }: TProps) => {
  const queryClient = useQueryClient();

  const handleRefetchingArticle = () =>
    queryClient.invalidateQueries(["article-list"]);

  return (
    <div className="mb-4 flex justify-between items-center">
      <div>
        <Popover
          trigger={"click"}
          content={<ArticleFilterContent handleFilter={handleFilter}/>}
          placement="bottomLeft"
        >
          <TextButton text="Filter" classButton="bg-[#f3ffd2] text-[#004737]" />
        </Popover>
      </div>

      <div className="flex gap-2">
        <TextButton
          text="Reload"
          isLoading={isLoading}
          onClick={handleRefetchingArticle}
        />
        <Link href={"/manager/articles/create-new"}>
          <TextButton
            text="New Article"
            disabled={isLoading}
            classButton="bg-[#56F09F]"
          />
        </Link>
      </div>
    </div>
  );
};
