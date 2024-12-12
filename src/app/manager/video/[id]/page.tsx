"use client";

import { uploadAPI, videoAPI } from "@/api";
import { TextButton, VideoGeneral, VideoSEO } from "@/components";
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
    LinkYoutube: yup.string().required(),
    Summary: yup.string().required(),
    Content: yup.string().required(),
  })
  .required();

const VideoDetail = ({ params }: { params: { id: string } }) => {
  const isCreate = params.id === "create-new";
  const router = useRouter();
  const [activeKey, setActiveKey] = useState("1");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TVideo>({
    mode: "onBlur",
    defaultValues: {
      Title: "",
      Thumnail: "",
      LinkYoutube: "",
      Summary: "",
      Content: "",
      Tags: [],
      IsFeature: false,
    },
    resolver: yupResolver(schema as any),
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["video-detail"],
    queryFn: async () => await videoAPI.getByID(params.id),
    onSuccess: (res) => {
      const data = res.Data;
      reset(data as TVideo);
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
    mutationFn: async (data: any) => await uploadAPI.image(data, "videos"),
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationCreate = useMutation({
    mutationKey: ["create-video"],
    mutationFn: async (data: TVideo) => videoAPI.create(data),
    onSuccess: (res) => {
      toast.success(res.Message);
      router.push("/manager/video");
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationUpdate = useMutation({
    mutationKey: ["update-video"],
    mutationFn: async (data: TVideo) => videoAPI.update(data),
    onSuccess: (res) => {
      toast.success(res.Message);
      router.push("/manager/video");
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleOnSubmit = async (data: TVideo) => {
    const { Thumnail, OgFacebookImage, OgxImage } = data;

    if (!Thumnail) {
      toast.warn("Please select Thumnail");
      return;
    }

    let sendData = { ...data };

    if (typeof Thumnail !== "string") {
      const imageURL = (await mutationUploadImage.mutateAsync(Thumnail as any))
        .Data;

      sendData.Thumnail = imageURL;
    }
    if (OgFacebookImage && typeof OgFacebookImage !== "string") {
      const imageURL = (
        await mutationUploadImage.mutateAsync(OgFacebookImage as any)
      ).Data;

      sendData.OgFacebookImage = imageURL;
    }
    if (OgxImage && typeof OgxImage !== "string") {
      const imageURL = (await mutationUploadImage.mutateAsync(OgxImage as any))
        .Data;

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
      children: <VideoGeneral control={control} isLoading={isLoading} />,
    },
    {
      key: "2",
      label: "For SEO",
      children: <VideoSEO control={control} isLoading={isLoading} />,
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

export default VideoDetail;
