"use client";

import { Input, Tag, Tooltip } from "antd";
import clsx from "clsx";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import styles from "./index.module.scss";

type TTagsFrom<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues, object>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions;

  label?: string;
  labelStyles?: string;
  required?: boolean;
  placeholder?: string;
  tagsWapperStyles?: string;
  defaultValue?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  type?: string;
};

export const TagsForm = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  label = "",
  labelStyles,
  placeholder = "Enter this fields",
  tagsWapperStyles,
  required = false,
  defaultValue = "",
  prefix,
  suffix,
  disabled = false,
  type = "text",
}: TTagsFrom<TFieldValues>) => {
  const [inputValue, setInputValue] = useState("");

  const handleClose = (removedTag: any, onChange: any, tags: any) => {
    const newTags = tags.filter((tag: any) => tag !== removedTag);
    onChange(newTags);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (onChange: any, tags: any) => {
    if (inputValue && !tags.includes(inputValue)) {
      onChange([...tags, inputValue]);
    }
    setInputValue("");
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value: tags } }) => (
        <div className={clsx(styles["input-wrapper"], tagsWapperStyles)}>
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
            <div className={clsx(styles["input-wrapper-input"])}>
              <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={() => handleInputConfirm(onChange, tags || [])}
                onPressEnter={() => handleInputConfirm(onChange, tags || [])}
                placeholder={placeholder}
                disabled={disabled}
              />
            </div>
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag: any, index: number) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag
                    key={tag}
                    closable={!disabled}
                    onClose={() => handleClose(tag, onChange, tags)}
                    className="text-sm m-0 rounded-full py-1 px-2 text-[#d87eb1] bg-white border-[#D87EB133] uppercase"
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
            </div>
          )}
        </div>
      )}
    />
  );
};
