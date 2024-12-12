"use client";

import {
  InputForm,
  RangeDateFilter,
  SelectForm,
  TextButton,
} from "@/components/global";
import { userSortOptions } from "@/config";
import { useForm } from "react-hook-form";

type TProps = {
  handleFilter: (newFilter: TUserFilter) => void;
};

export const UserFilterContent = ({ handleFilter }: TProps) => {
  const { control, reset, handleSubmit, setValue, watch } = useForm<
    TUserFilter & { TypeSort?: number }
  >({
    mode: "onBlur",
  });

  const handlePress = async (data: TUserFilter) => {
    handleFilter({ ...data, PageIndex: 1 });
  };

  return (
    <div className="w-[500px] grid grid-cols-2 gap-4">
      <InputForm
        control={control}
        name="SearchByName"
        placeholder="Find by Name"
        label="Name"
        inputWapperStyles="col-span-full"
      />

      <RangeDateFilter
        handleDate={(val) => {
          const fromDate = val[0] || undefined;
          const toDate = val[1] || undefined;

          if (val) {
            setValue("FromDate", fromDate);
            setValue("ToDate", toDate);
          } else {
            setValue("FromDate", undefined);
            setValue("ToDate", undefined);
          }
        }}
        label="From date - To date"
        allowClear
      />

      <SelectForm
        control={control}
        name="Sort"
        label="Sort"
        dataOptions={userSortOptions}
      />

      <TextButton
        text="Apply"
        classButton={`!bg-[green] !text-white !py-2 col-span-full}`}
        onClick={handleSubmit(handlePress)}
      />
    </div>
  );
};
