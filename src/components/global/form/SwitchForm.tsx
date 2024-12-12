"use client"

import React from "react";
import { Switch } from "antd";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

import styles from "./index.module.scss";
import clsx from "clsx";

type TProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues, object>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  switchFormClass?: string;
  required?: boolean;
  label?: string;
  labelStyles?: string;
  hideText?: boolean;
  trueChecked?: string;
  falseChecked?: string;
  disabled?: boolean;
};

export const SwitchForm = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  required,
  rules,
  switchFormClass= "",
  labelStyles = "",
  hideText = false,
  trueChecked = "Show",
  falseChecked = "Hidden",
  disabled = false,
}: TProps<TFieldValues>) => {
  return (
    <div className={switchFormClass}>
      {label && (
        <label htmlFor={name} className={clsx(styles["label"], labelStyles)}>
          <div className={styles["label-name"]}>{label}</div>
          {required && <span className={styles["label-required"]}>*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, ...newField }, fieldState: { error } }) => (
          <div className="w-full">
            <div className="flex items-center">
              {!hideText && <div className="text-base">{falseChecked}</div>}
              <div className="mx-2">
                <Switch checked={value} {...newField} disabled={disabled} className="border-red-400"/>
              </div>
              {!hideText && <div className="text-base">{trueChecked}</div>}
            </div>
            <div className={styles["error-msg"]}>{error?.message}</div>
          </div>
        )}
      />
    </div>
  );
};
