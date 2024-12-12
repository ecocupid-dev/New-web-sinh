"use client";

import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Select, SelectProps } from "antd";

type TSelectForm<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues, object>;
  name: Path<TFieldValues>;
  dataOptions: { label: string; value: string | number | null | undefined }[];
  rules?: RegisterOptions;
  label?: string;
  labelStyles?: string;
  required?: boolean;
  placeholder?: string;
  wrapperStyles?: string;
  defaultValue?: string;
  disabled?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  onChangeOutside?: SelectProps["onChange"];
};

export const SelectForm = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  label = "",
  labelStyles,
  placeholder = "Select this fields",
  wrapperStyles,
  required = false,
  defaultValue = "",
  disabled = false,
  dataOptions,
  allowClear = true,
  showSearch = true,
  onChangeOutside
}: TSelectForm<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState: { errors },
      }) => (
        <div className={clsx(styles["select-wrapper"], wrapperStyles)}>
          {label && (
            <label
              htmlFor={name}
              className={clsx(styles["label"], labelStyles)}
            >
              <div className={styles["label-name"]}>{label}</div>
              {required && <span className={styles["label-required"]}>*</span>}
            </label>
          )}
          <Select
            className={styles["select-wrapper-select"]}
            value={value}
            placeholder={placeholder.toString()}
            onChange={(value, option) => {
              onChange(value, option);
              onChangeOutside?.(value, option);
            }}
            disabled={disabled}
            options={dataOptions}
            allowClear={allowClear}
            optionFilterProp="children"
            filterOption={(input, option) => {
              return (option?.label ?? "").toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            showSearch={showSearch}
          />
          <div className={styles["error-msg"]}>{error?.message}</div>
        </div>
      )}
    />
  );
};
