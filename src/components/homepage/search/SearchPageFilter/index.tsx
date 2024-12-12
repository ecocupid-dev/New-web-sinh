import {
  InputForm,
  RangeDateFilter,
  SelectForm,
  TextButton,
} from "@/components/global";
import { countryList, multipleResourcesSortOptions } from "@/config";
import { useCatalogue } from "@/hook";
import { Popover, Tag } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import clsx from "clsx";
import { _format } from "@/components/utils";
import { useDebounceFunc } from "@/hook/useDebounceFunc";
import { ESearchResourceType } from "@/enum/home";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

const sectionData = [
  {
    value: ESearchResourceType.EcoFilms,
    title: "Eco-Films",
  },
  {
    value: ESearchResourceType.EcoStories,
    title: "Eco-Stories",
  },
  {
    value: ESearchResourceType.OurReaderStories,
    title: "Our Readers’ Stories",
  },
];

type TProps = {
  onFilter: (params: Partial<TMultipleResourcesFilter>) => void;
  onClearFilter: () => void;
  isLoading?: boolean;
};

export const SearchPageFilter = ({
  onFilter,
  onClearFilter,
  isLoading,
}: TProps) => {
  const { caterogyList } = useCatalogue({ categoryEnabled: true });

  const caterogyListOptions = useMemo(() => {
    const options: { value: string; label: string }[] = [];
    if (Array.isArray(caterogyList?.Data)) {
      caterogyList.Data.forEach((item) => {
        if (item.Name !== "Our Readers' Stories" && item.IsPublish) {
          options.push({
            value: item._id,
            label: item.Name,
          });
        }
      });
    }

    return options;
  }, [caterogyList]);

  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  // ========== GET PARAM ITEM OF URL ==========
  const searchParams = useSearchParams();
  const CategoryId = searchParams.get("CategoryId");
  const CountryId = searchParams.get("CountryId");
  const FromDate = searchParams.get("FromDate");
  const ToDate = searchParams.get("ToDate");
  const Sort = searchParams.get("Sort");
  const Search = searchParams.get("Search");
  const ResourceType = searchParams.get("ResourceType");

  // ========== HOOK FORM ===========
  const { control, reset, handleSubmit, setValue, watch } =
    useForm<TMultipleResourcesFilter>({
      mode: "onBlur",
    });

  const watchFromDate = watch("FromDate");
  const watchToDate = watch("ToDate");

  // ========== SIDE EFFECTS ==========
  useEffect(() => {
    reset({
      CategoryId: CategoryId || undefined,
      FromDate: FromDate ? Number(FromDate) : undefined,
      ToDate: ToDate ? Number(ToDate) : undefined,
      CountryId: CountryId ? Number(CountryId) : undefined,
      Sort: Sort ? Number(Sort) : undefined,
      Search: Search || "",
    });
  }, [Search, Sort, FromDate, ToDate, CountryId, CategoryId]);

  useEffect(() => {
    if (ResourceType) {
      setSelectedTags(ResourceType.split(",")?.map((item) => Number(item)));
    } else {
      setSelectedTags([]);
    }
  }, [ResourceType]);

  // ========== METHODS ==========
  const debouncedFilter = useDebounceFunc(onFilter, 1000);

  const handleChange = (tag: number, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);

    setSelectedTags(nextSelectedTags);
    debouncedFilter({ ResourceType: nextSelectedTags.toString() });
  };

  // ========== RENDER FILTER FORM ==========
  const renderFilterContent = () => {
    return (
      <div className={clsx(styles.filterContentWrapper)}>
        <div className={styles.filterContent}>
          {(!selectedTags?.length ||
            selectedTags?.includes(ESearchResourceType.EcoStories)) && (
            <SelectForm
              control={control}
              name="CategoryId"
              placeholder="Select category"
              label="Select category"
              dataOptions={caterogyListOptions}
            />
          )}

          <SelectForm
            control={control}
            name="CountryId"
            placeholder="Select country"
            label="Select country"
            dataOptions={countryList?.map(
              (item: { Id: number; Name: string }) => ({
                value: item.Id,
                label: item.Name,
              })
            )}
          />

          <RangeDateFilter
            handleDate={(val) => {
              const fromDate = val[0] || undefined;
              const toDate = val[1] || undefined;

              if (val) {
                setValue(
                  "FromDate",
                  _format.convertLocalTimestampToUTC(fromDate)
                );
                setValue("ToDate", _format.convertLocalTimestampToUTC(toDate));
              } else {
                setValue("FromDate", undefined);
                setValue("ToDate", undefined);
              }
            }}
            label="From date - To date"
            allowClear
            value={[
              watchFromDate ? dayjs(watchFromDate) : undefined,
              watchToDate ? dayjs(watchToDate) : undefined,
            ]}
          />
        </div>

        <div className="flex justify-end mt-4">
          <div className="min-w-[100px]">
            <TextButton
              text="Apply"
              classButton={`!bg-[green] !text-white !py-2 w-full`}
              onClick={handleSubmit(onFilter)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <InputForm
          control={control}
          name="Search"
          placeholder="Search by title, project name, tags"
          inputWapperStyles="col-span-full"
          onChangeOutside={(event) => {
            if (!event.target?.value) {
              onFilter({ Search: undefined });
            }
          }}
          onPressEnter={(event) => {
            onFilter({ Search: (event.target as any)?.value });
          }}
        />
      </div>
      <div className="min-h-[45px] max-h-[46px] flex gap-2">
        {sectionData.map((item) => {
          return (
            <Tag.CheckableTag
              key={item.value}
              checked={selectedTags.includes(item.value)}
              onChange={(checked) => handleChange(item.value, checked)}
              className={clsx({ [styles.checkableTagDisabled]: isLoading })}
            >
              <span>{item.title}</span>
            </Tag.CheckableTag>
          );
        })}
      </div>
      <div className={styles.sortWrapper}>
        <SelectForm
          control={control}
          name="Sort"
          placeholder="Sort"
          dataOptions={multipleResourcesSortOptions}
          onChangeOutside={(val) => {
            onFilter({ Sort: val });
          }}
          disabled={isLoading}
          required={false}
        />
      </div>
      <div className="flex-1 flex justify-end gap-4 min-h-[45px]">
        <div className={styles.filterButtonWrapper}>
          <Popover
            trigger={"click"}
            content={renderFilterContent()}
            placement="bottomLeft"
          >
            <TextButton text="Filter" classButton={styles.filterButton} />
          </Popover>
        </div>
        <div className={styles.clearButtonWrapper}>
          <TextButton
            text="Reset"
            classButton={styles.clearButton}
            onClick={onClearFilter}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
