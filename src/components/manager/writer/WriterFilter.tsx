"use client";

import { uploadAPI, writerAPI } from "@/api";
import { TextButton } from "@/components/global";
import { yupResolver } from "@hookform/resolvers/yup";
import { Popover } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";
import { WriterModal } from "./WriterModal";
import { WriterFilterContent } from "./WriterFilterContent";

type TProps = {
  isLoading: boolean;
  handleFilter: (newFilter: TCategoryFilter) => void;
};

const schema = yup
  .object({
    UserName: yup.string().trim().required(),
  })
  .required();

export const WriterFilter = ({ isLoading, handleFilter }: TProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultValues: TWriter = {
    UserName: "",
    Avatar: "",
    Description: "",
    Email: "",
    LinkedIn: "",
    IsPublish: true
  };

  const { control, reset, handleSubmit, watch } = useForm<TWriter>({
    mode: "onBlur",
    defaultValues: defaultValues,
    resolver: yupResolver(schema as any),
  });

  const handleRefetchingUser = () => {
    queryClient.invalidateQueries(["writer-list"]);
  };

  const handleModalUser = () => {
    setIsOpen(!isOpen);
    reset(defaultValues);
  };

  const mutationCreate = useMutation({
    mutationKey: ["create-new-user"],
    mutationFn: async (data: TWriter) => await writerAPI.create(data),
    onSuccess: (res) => {
      toast.success(res.Message);
      handleRefetchingUser();
      handleModalUser();
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationUploadImage = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: async (data: any) => await uploadAPI.image(data, "writers"),
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleCreateUser = async (data: TWriter) => {
    const { Avatar } = data;

    if (typeof Avatar !== "string") {
      const imageURL = (await mutationUploadImage.mutateAsync(Avatar as any))
        .Data;
      const sendData = {
        ...watch(),
        Avatar: imageURL,
      };
      await mutationCreate.mutateAsync(sendData);
    } else {
      await mutationCreate.mutateAsync(data);
    }
  };

  return (
    <div className="mb-4 flex justify-between items-end">
    <div>
      <Popover
        trigger={"click"}
        content={<WriterFilterContent handleFilter={handleFilter}/>}
        placement="bottomLeft"
      >
        <TextButton text="Filter" classButton="bg-[#f3ffd2] text-[#004737]" />
      </Popover>
    </div>
      <div className="flex gap-2">
        <TextButton
          text="Reload"
          isLoading={isLoading}
          onClick={handleRefetchingUser}
        />
        <TextButton
          text="New Writer"
          disabled={isLoading}
          onClick={handleModalUser}
          classButton="bg-[#56F09F]"
        />
      </div>

      <WriterModal
        control={control}
        isOpen={isOpen}
        onCancel={handleModalUser}
        title="create new writer"
        isLoading={mutationCreate.isLoading || mutationUploadImage.isLoading}
        onOk={handleSubmit(handleCreateUser)}
      />
    </div>
  );
};
