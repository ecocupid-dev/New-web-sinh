"use client";

import { Select } from "antd";
import clsx from "clsx";
import styles from "./index.module.scss";

type TSelectFilter = {
  handleSelect: (val: any) => void;
  dataOptions: { label: string; value: string | number | boolean }[];
  label?: string;
  labelStyles?: string;
  required?: boolean;
  placeholder?: string;
  wrapperStyles?: string;
  defaultValue?: string;
  disabled?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
};

export const SelectFilter = ({
  handleSelect,
  label = "",
  labelStyles,
  placeholder = "Select this fields",
  wrapperStyles,
  required = false,
  defaultValue = "",
  disabled = false,
  dataOptions,
  allowClear = true,
  showSearch = false,
}: TSelectFilter) => {
  return (
    <div className={clsx(styles["select-wrapper"], wrapperStyles)}>
      {label && (
        <label className={clsx(styles["label"], labelStyles)}>
          <div className={styles["label-name"]}>{label}</div>
          {required && <span className={styles["label-required"]}>*</span>}
        </label>
      )}
      <Select
        className={styles["select-wrapper-select"]}
        placeholder={placeholder.toString()}
        onChange={handleSelect}
        disabled={disabled}
        options={dataOptions}
        allowClear={allowClear}
        optionFilterProp="children"
        filterOption={(input, option) => {
          return (
            (option?.label ?? "").toLowerCase().indexOf(input.toLowerCase()) >=
            0
          );
        }}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        showSearch={showSearch}
      />
    </div>
  );
};
