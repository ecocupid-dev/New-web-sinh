"use client";

import { homeAPI } from "@/api";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import styles from "./index.module.scss";
import { Empty, Skeleton } from "antd";
import { _format } from "@/components/utils";
import { SearchPageFilter } from "./SearchPageFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ResourceItem } from "./ResourceItem";
import MyPagination from "@/components/global/pagination";
import { ESearchResourceType } from "@/enum/home";

const PAGE_SIZE = 12;

// ----- Remove empty properties of object -----
const removeNullUndefined = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) =>
        value !== null &&
        value !== undefined &&
        !(typeof value === "string" && value.trim() === "") &&
        !(Array.isArray(value) && value.length === 0)
    )
  );
};

export const SearchPage = () => {
  const [totalRow, setTotalRow] = useState(0);

  // ========== SETUP PARAMS QUERY ==========
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const PageIndex = searchParams.get("PageIndex");
  const PageSize = searchParams.get("PageSize");
  const CategoryId = searchParams.get("CategoryId");
  const CountryId = searchParams.get("CountryId");
  const FromDate = searchParams.get("FromDate");
  const ToDate = searchParams.get("ToDate");
  const Sort = searchParams.get("Sort");
  const Search = searchParams.get("Search");
  const ResourceType = searchParams.get("ResourceType");

  const query = {
    PageIndex: PageIndex ? Number(PageIndex) : 1,
    PageSize: PageSize ? Number(PageSize) : PAGE_SIZE,
    CategoryId: CategoryId || undefined,
    FromDate: FromDate ? Number(FromDate) : undefined,
    ToDate: ToDate ? Number(ToDate) : undefined,
    CountryId: CountryId ? Number(CountryId) : undefined,
    Sort: Sort ? Number(Sort) : undefined,
    Search: Search || "",
    ResourceType: ResourceType || "",
  };

  const depencies = [
    PageIndex,
    PageSize,
    CategoryId,
    CountryId,
    FromDate,
    ToDate,
    Sort,
    Search,
    ResourceType,
  ];

  // ========== QUERIES DATA ==========
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GET /multiple-resources", depencies],
    queryFn: async () => await homeAPI.getMultipleResources(query),
    onSuccess: (res) => {
      setTotalRow(res.Total || 0);

      return res;
    },
    onError: (error: any) => toast.error(error.Message),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // ========== METHODS ==========
  const handleFilter = (newFilter: Partial<TMultipleResourcesFilter>) => {
    if (isLoading || isFetching) return;

    const params = {
      ...query,
      ...newFilter,
      PageIndex: newFilter?.PageIndex || 1,
    };

    // Remove filter by CategoryId if ResourceType not includes EcoStories type
    if (
      params?.ResourceType?.toString() &&
      params?.CategoryId &&
      !params?.ResourceType?.toString()?.includes(
        `${ESearchResourceType.EcoStories}`
      )
    ) {
      delete params["CategoryId"];
    }

    const queryString = new URLSearchParams(
      removeNullUndefined(params)
    ).toString();

    const newUrl = `${pathname}?${queryString}`;
    router.push(newUrl);
  };

  const handleClearFilter = () => {
    router.push(pathname);
  };

  return (
    <div className={styles["itemWrapper-main"]}>
      <div className="mb-4">
        <SearchPageFilter
          onFilter={handleFilter}
          onClearFilter={handleClearFilter}
          isLoading={isFetching}
        />
      </div>
      {isLoading ? (
        <Skeleton active className="w-full px-0 py-4 mb-6 overflow-hidden" />
      ) : (
        <>
          {totalRow > 0 ? (
            <>
              <div className={styles["itemWrapper-main-list"]}>
                {data?.Data?.map((item) => {
                  return <ResourceItem key={item._id} item={item} />;
                })}
              </div>
              <div className="flex my-6 mr-2 justify-end">
                <MyPagination
                  current={query.PageIndex}
                  pageSize={query.PageSize}
                  total={totalRow}
                  onChange={(pageIndex, pageSize) =>
                    handleFilter({
                      PageIndex: pageIndex,
                      PageSize: pageSize,
                    })
                  }
                />
              </div>
            </>
          ) : (
            <Empty className="mt-6 mb-8" />
          )}
        </>
      )}
    </div>
  );
};
