"use client";

import { caterogyAPI } from "@/api";
import { CategoryModal, TextButton } from "@/components";
import { Popover } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { CategoryFilterContent } from "./CategoryFilterContent";

type TProps = {
  isLoading: boolean;
  handleFilter: (newFilter: TCategoryFilter) => void;
};

export const CategoryFilter = ({ isLoading, handleFilter }: TProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    control: controlCreate,
    handleSubmit,
    reset,
  } = useForm<TCreateCategory>({
    mode: "onBlur",
    defaultValues: {
      Name: "",
      Color: "#004737",
      Description: "",
    },
  });

  const handleModalCreate = () => {
    setIsOpen(!isOpen);
    reset();
  };

  const handleRefetchingCategory = () =>
    queryClient.invalidateQueries(["category-list"]);

  const mutationCreate = useMutation({
    mutationKey: ["create-category"],
    mutationFn: async (data: TCreateCategory) => await caterogyAPI.create(data),
    onSuccess: (res) => {
      toast.success(res.Message);
      handleModalCreate();
      handleRefetchingCategory();
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleCreateCategory = (data: TCreateCategory) => {
    mutationCreate.mutateAsync(data);
  };

  return (
    <div className="mb-4 flex justify-between items-end">
      <div>
        <Popover
          trigger={"click"}
          content={<CategoryFilterContent handleFilter={handleFilter} />}
          placement="bottomLeft"
        >
          <TextButton text="Filter" classButton="bg-[#f3ffd2] text-[#004737]" />
        </Popover>
      </div>
      {/* <InputFilter
        inputWapperStyles="w-[500px]"
        handleSubmit={(val) => {
          handleFilter({SearchByName: val})
        }}
        placeholder="Enter category name (press Enter key)"
      /> */}
      <div className="flex gap-2">
        <TextButton
          text="Reload"
          isLoading={isLoading}
          onClick={handleRefetchingCategory}
        />
        <TextButton
          text="New Caterogy"
          disabled={isLoading}
          onClick={handleModalCreate}
          classButton="bg-[#56F09F]"
        />
      </div>
      <CategoryModal
        control={controlCreate}
        isOpen={isOpen}
        onCancel={handleModalCreate}
        title="create new category"
        isLoading={mutationCreate.isLoading}
        onOk={handleSubmit(handleCreateCategory)}
        type="create"
      />
    </div>
  );
};
