"use client";

import {
  InputForm,
  RangeDateFilter,
  SelectFilter,
  SelectForm,
  TextButton,
} from "@/components/global";
import { countryList } from "@/config";
import { useCatalogue } from "@/hook";
import moment from "moment";
import { useForm } from "react-hook-form";

type TProps = {
  handleFilter: (newFilter: TArticleFilter) => void;
};

export const ArticleFilterContent = ({ handleFilter }: TProps) => {
  const { caterogyList } = useCatalogue({ categoryEnabled: true });

  const { control, reset, handleSubmit, setValue, watch } = useForm<
    TArticleFilter & { TypeSort?: number }
  >({
    mode: "onBlur",
  });

  const handlePress = async (data: TArticleFilter) => {
    handleFilter(data);
  };

  const handleSort = (value: number) => {
    if (!value) {
      setValue("IsNewest", undefined);
      setValue("IsOldest", undefined);
      setValue("IsMostImpactful", undefined);
    }

    if (value === 1) {
      setValue("IsNewest", true);
      setValue("IsOldest", undefined);
      setValue("IsMostImpactful", undefined);
      return;
    }
    if (value === 2) {
      setValue("IsOldest", true);
      setValue("IsNewest", undefined);
      setValue("IsMostImpactful", undefined);
      return;
    }
    if (value === 3) {
      setValue("IsMostImpactful", true);
      setValue("IsNewest", undefined);
      setValue("IsOldest", undefined);
      return;
    }
  };

  return (
    <div className="w-[500px] grid grid-cols-2 gap-4">
      <InputForm
        control={control}
        name="Title"
        placeholder="Find by Title"
        label="Title"
        inputWapperStyles="col-span-full"
      />
      <SelectForm
        control={control}
        name="CategoryId"
        placeholder="Select category"
        label="Select category"
        dataOptions={caterogyList?.Data?.map(
          (item: { _id: string; Name: string }) => ({
            value: item._id,
            label: item.Name,
          })
        )}
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

          // console.log(
          //   new Date(fromDate).setUTCHours(0, 0, 0, 0),
          //   new Date(toDate).setUTCHours(0, 0, 0, 0)
          // );

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

      <SelectFilter
        handleSelect={(value) => handleSort(value)}
        label="Sort"
        dataOptions={[
          {
            label: "Newest",
            value: 1,
          },
          {
            label: "Oldest",
            value: 2,
          },
          {
            label: "Most Impactful",
            value: 3,
          },
        ]}
      />

      <TextButton
        text="Apply"
        classButton={`!bg-[green] !text-white !py-2 col-span-full}`}
        onClick={handleSubmit(handlePress)}
      />
    </div>
  );
};
