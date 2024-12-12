"use client";

import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import styles from "./index.module.scss";
import clsx from "clsx";
import { ColorPicker } from "antd";

type TColorForm<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues, object>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions;

  label?: string;
  labelStyles?: string;
  required?: boolean;
  inputWapperStyles?: { [key: string]: string };
  showTextColor?: boolean;
  disabled?: boolean;
};

export const ColorForm = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  required,
  label,
  labelStyles,
  inputWapperStyles,
  showTextColor = false,
  disabled = false,
}: TColorForm<TFieldValues>) => {
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
          <ColorPicker
            showText={showTextColor}
            className="w-fit"
            size="large"
            onChange={(val, hex) => {
              onChange(hex);
            }}
            disabled={disabled}
            defaultValue={"#004737"}
            value={value}
            style={{
              height: "fit-content",
              borderRadius: "12px",
              border: "1px solid #c2c7d0",
              padding: "8px",
            }}
          />
        </div>
      )}
    />
  );
};
