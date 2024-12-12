"use client";

import { homeAPI } from "@/api";
import { store } from "@/store";
import "@/styles/categories.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";
import { Provider } from "react-redux";
import { ButtonMore } from "..";
import { CategoriesSegmented } from "./CategoriesSegmented";
import { CategoriesSwiper } from "./CategoriesSwiper";
import styles from "./index.module.scss";
import { Spin } from "antd";
import { ESearchResourceType } from "@/enum/home";

const queryClient = new QueryClient();

const InnerComponent = () => {
  const [selectedCat, setSelectedCat] = useState<string>("");

  const { data: segmentedData } = useQuery({
    queryKey: ["category-feature-list"],
    queryFn: () =>
      homeAPI.getCategoryList({ IsFeature: true, IsPublish: true }),
    onSuccess: (res) => {
      const data = res.Data;
      if (data) {
        setSelectedCat(data[0]._id);
      }
      return data as THomeCategory[];
    },
    onError: (error: any) => {
      console.log("Error fetching homeAPI.getCategoryList");
      return [];
    },
  });

  const data = useMutation({
    mutationKey: ["article-feature-list"],
    mutationFn: (CategoryId: string) =>
      homeAPI.getEcoArticleByCatIDlist({
        CategoryId: CategoryId,
        IsFeature: true,
      }),
    onSuccess: (res) => {
      const data = res.Data;
    },
  });

  const handleFetchingArticle = async (_id: string) =>
    await data.mutateAsync(_id);

  useEffect(() => {
    if (selectedCat) {
      handleFetchingArticle(selectedCat);
    }
  }, [selectedCat]);

  return (
    <div className={clsx(styles["eco-categories"], "container")}>
      <div className={"section-main-title"}>
        <h1>Featured categories</h1>
      </div>
      <p className={"section-main-des"}>
        Be inspired by the amazing people saving the environment today!
      </p>
      <div className={styles["eco-categories-content"]}>
        <CategoriesSegmented
          data={segmentedData?.Data}
          selectedCat={selectedCat}
          handleOnChangeCat={(catId) => setSelectedCat(catId)}
        />
        <>
          {data.isLoading ? (
            <div className="w-full flex items-center justify-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <CategoriesSwiper data={data.data?.Data as TListArticleByCatId[]} />
          )}
        </>
      </div>
      <ButtonMore
        path={`/search?&ResourceType=${ESearchResourceType.EcoStories}&CategoryId=${selectedCat}`}
      />
    </div>
  );
};

export const EcoCategories = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <InnerComponent />
      </Provider>
    </QueryClientProvider>
  );
};
