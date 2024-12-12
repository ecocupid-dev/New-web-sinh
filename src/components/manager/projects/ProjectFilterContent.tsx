"use client";

import {
  InputForm,
  RangeDateFilter,
  SelectForm,
  TextButton,
} from "@/components/global";
import { countryList, projectSortOptions } from "@/config";
import { useForm } from "react-hook-form";

type TProps = {
  handleFilter: (newFilter: TProjectFilter) => void;
};

export const ProjectFilterContent = ({ handleFilter }: TProps) => {
  const { control, reset, handleSubmit, setValue, watch } = useForm<
    TProjectFilter & { TypeSort?: number }
  >({
    mode: "onBlur",
  });

  const handlePress = async (data: TProjectFilter) => {
    handleFilter({ ...data, PageIndex: 1 });
  };

  return (
    <div className="w-[500px] grid grid-cols-2 gap-4">
      <InputForm
        control={control}
        name="SearchByName"
        placeholder="Find by Title"
        label="Title"
      />

      <SelectForm
        control={control}
        name="CountryId"
        placeholder="Select country"
        label="Select country"
        dataOptions={countryList?.map((item: { Id: number; Name: string }) => ({
          value: item.Id,
          label: item.Name,
        }))}
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
        dataOptions={projectSortOptions}
      />

      <TextButton
        text="Apply"
        classButton={`!bg-[green] !text-white !py-2 col-span-full}`}
        onClick={handleSubmit(handlePress)}
      />
    </div>
  );
};
