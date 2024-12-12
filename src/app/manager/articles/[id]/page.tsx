"use client";

import { articleAPI, uploadAPI } from "@/api";
import { ArticleGeneral, ArticleSEO, TextButton } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tabs, TabsProps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup
  .object({
    Title: yup.string().required(),
    Summary: yup.string().required(),
    Content: yup.string().required(),
    ProjectId: yup.string().required(),
    CountryId: yup.number().required(),
    CategoryId: yup.string().required(),
    WriterId: yup.string().required()
  })
  .required();

const ArticleDetail = ({ params }: { params: { id: string } }) => {
  const isCreate = params.id === "create-new";
  const router = useRouter();
  const [activeKey, setActiveKey] = useState("1");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TArticles>({
    mode: "onBlur",
    defaultValues: {
      Tags: [],
      IsFeature: false,
      IsPublish: true
    },
    resolver: yupResolver(schema as any),
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["article-detail"],
    queryFn: async () => await articleAPI.getByID(params.id),
    onSuccess: (res) => {
      const data = res.Data;
      reset(data as TArticles);
      return res.Data;
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
    // staleTime: 10000,
    enabled: !isCreate && !!params.id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isCreate) {
      reset({});
    } else {
      refetch();
    }
  }, [isCreate, params]);

  const mutationUploadImage = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: async (data: any) => await uploadAPI.image(data, "articles"),
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationCreate = useMutation({
    mutationKey: ["create-articles"],
    mutationFn: async (data: TArticles) => articleAPI.create(data),
    onSuccess: (res) => {
      toast.success(res.Message);
      router.push("/manager/articles");
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationUpdate = useMutation({
    mutationKey: ["update-articles"],
    mutationFn: async (data: TArticles) => articleAPI.update(data),
    onSuccess: (res) => {
      toast.success(res.Message);
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleOnSubmit = async (data: TArticles) => {
    const { Thumnail, OgFacebookImage, OgxImage } = data;

    if (!Thumnail) {
      toast.warn("Please select Thumnail");
      return;
    }

    let sendData = { ...data };

    if (typeof Thumnail !== "string") {
      const imageURL = (await mutationUploadImage.mutateAsync(Thumnail as any))
        .Data;
      setValue("Thumnail", imageURL);
      sendData.Thumnail = imageURL;
    }
    if (OgFacebookImage && typeof OgFacebookImage !== "string") {
      const imageURL = (
        await mutationUploadImage.mutateAsync(OgFacebookImage as any)
      ).Data;
      setValue("OgFacebookImage", imageURL);
      sendData.OgFacebookImage = imageURL;
    }
    if (OgxImage && typeof OgxImage !== "string") {
      const imageURL = (await mutationUploadImage.mutateAsync(OgxImage as any))
        .Data;
      setValue("OgxImage", imageURL);
      sendData.OgxImage = imageURL;
    }

    if (isCreate) {
      await mutationCreate.mutateAsync(sendData);
    } else {
      await mutationUpdate.mutateAsync(sendData);
    }
  };

  const isLoading =
    mutationCreate.isLoading ||
    mutationUploadImage.isLoading ||
    mutationUpdate.isLoading;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: <ArticleGeneral control={control} isLoading={isLoading} />,
    },
    {
      key: "2",
      label: "For SEO",
      children: <ArticleSEO control={control} isLoading={isLoading} />,
    },
  ];

  return (
    <div className="box-content">
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(vl) => setActiveKey(vl)}
        activeKey={activeKey}
        tabBarExtraContent={
          <TextButton
            text={isCreate ? "Create" : "Update"}
            classButton="bg-[#56F09F] py-1 px-4 uppercase"
            onClick={handleSubmit(handleOnSubmit)}
            isLoading={isLoading}
          />
        }
      />
    </div>
  );
};

export default ArticleDetail;
