"use client";

import { InputFilter, TextButton } from "@/components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { ProjectModal } from "./ProjectModal";
import { toast } from "react-toastify";
import { projectAPI, uploadAPI } from "@/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Popover } from "antd";
import { ProjectFilterContent } from "./ProjectFilterContent";

type TProps = {
  isLoading: boolean;
  handleFilter: (newFilter: TCategoryFilter) => void;
};

const schema = yup
  .object({
    Title: yup.string().trim().required(),
  })
  .required();

export const ProjectFilter = ({ isLoading, handleFilter }: TProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset, watch } = useForm<TProject>({
    mode: "onBlur",
    defaultValues: {
      Title: "",
      Image: "",
      Description: "",
    },
    resolver: yupResolver(schema as any),
  });

  const handleModalCreate = () => {
    setIsOpen(!isOpen);
    reset();
  };

  const handleRefetchingCategory = () =>
    queryClient.invalidateQueries(["project-list"]);

  const mutationCreate = useMutation({
    mutationKey: ["create-category"],
    mutationFn: async (data: TProject) => await projectAPI.create(data),
    onSuccess: (res) => {
      toast.success(res.Message);
      handleModalCreate();
      handleRefetchingCategory();
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationUploadImage = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: async (data: any) => await uploadAPI.image(data, "projects"),
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleCreateProject = async (data: TProject) => {
    const { Image } = data;

    if (typeof Image !== "string") {
      const imageURL = (await mutationUploadImage.mutateAsync(Image as any))
        .Data;
      const sendData = {
        ...watch(),
        Image: imageURL,
      };
      await mutationCreate.mutateAsync(sendData);
    } else {
      await mutationCreate.mutateAsync(data);
    }
  };

  return (
    <div className="mb-4 flex justify-between items-center">
      <div>
        <Popover
          trigger={"click"}
          content={<ProjectFilterContent handleFilter={handleFilter} />}
          placement="bottomLeft"
        >
          <TextButton text="Filter" classButton="bg-[#f3ffd2] text-[#004737]" />
        </Popover>
      </div>
      <div className="flex gap-2">
        <TextButton
          text="Reload"
          isLoading={isLoading}
          onClick={handleRefetchingCategory}
        />
        <TextButton
          text="New Project"
          disabled={isLoading}
          onClick={handleModalCreate}
          classButton="bg-[#56F09F]"
        />
      </div>

      <ProjectModal
        control={control}
        isOpen={isOpen}
        onCancel={handleModalCreate}
        title="create new project"
        isLoading={mutationCreate.isLoading || mutationUploadImage.isLoading}
        onOk={handleSubmit(handleCreateProject)}
      />
    </div>
  );
};
