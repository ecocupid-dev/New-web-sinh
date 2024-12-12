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
import { Input, InputProps } from "antd";

type TInputForm<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues, object>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions;

  label?: string;
  labelStyles?: string;
  required?: boolean;
  placeholder?: string;
  inputWapperStyles?: string;
  defaultValue?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  type?: string;
  onChangeOutside?: InputProps["onChange"];
  onPressEnter?: InputProps["onPressEnter"];
  allowClear?: boolean;
};

export const InputForm = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  label = "",
  labelStyles,
  placeholder = "Enter this fields",
  inputWapperStyles,
  required = false,
  defaultValue = "",
  prefix,
  suffix,
  disabled = false,
  type = "text",
  onChangeOutside,
  onPressEnter,
  allowClear = false,
}: TInputForm<TFieldValues>) => {
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
        <div className={clsx(styles["input-wrapper"], inputWapperStyles)}>
          {label && (
            <label
              htmlFor={name}
              className={clsx(styles["label"], labelStyles)}
            >
              <div className={styles["label-name"]}>{label}</div>
              {required && <span className={styles["label-required"]}>*</span>}
            </label>
          )}
          <div className={clsx(styles["input-wrapper-main"])}>
            {prefix && (
              <div className={clsx(styles["input-wrapper-prefix"])}>
                {prefix}
              </div>
            )}
            <div className={clsx(styles["input-wrapper-input"])}>
              <Input
                value={value}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={(event) => {
                  onChange(event);
                  onChangeOutside?.(event);
                }}
                disabled={disabled}
                type={type}
                onPressEnter={onPressEnter}
                allowClear={allowClear}
              />
            </div>
            {suffix && (
              <div className={clsx(styles["input-wrapper-suffix"])}>
                {suffix}
              </div>
            )}
          </div>
          <div className={styles["error-msg"]}>{error?.message}</div>
        </div>
      )}
    />
  );
};
