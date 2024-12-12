"use client";

import { Input } from "antd";
import clsx from "clsx";
import { useCallback, useRef } from "react";
import styles from "./index.module.scss";

type TProps = {
  label?: string;
  labelStyles?: string;
  placeholder?: string;
  inputWapperStyles?: string;
  value?: string;
  onChange?: () => void;
  disabled?: boolean;
  handleSubmit?: (val: string) => void;
  handleSearch?: (val: string) => void;
};

export const InputFilter = ({
  label,
  labelStyles,
  placeholder,
  inputWapperStyles,
  value,
  disabled,
  onChange,
  handleSearch,
  handleSubmit,
}: TProps) => {
  const input = useRef("");
  const handleInput = useCallback((val: string) => (input.current = val), []);

  return (
    <div className={clsx(styles["input-wrapper"], inputWapperStyles)}>
      {label && (
        <div className={clsx(styles["input-wrapper-label"], labelStyles)}>
          <div className={styles["input-wrapper-label-name"]}>{label}</div>
        </div>
      )}
      <div className={clsx(styles["input-wrapper-main"])}>
        <div className={clsx(styles["input-wrapper-input"])}>
          <Input
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              handleSearch
                ? handleSearch(e.target.value)
                : handleInput(e.target.value);
            }}
            disabled={disabled}
            onKeyDown={(e) => {
              handleSubmit && e.code === "Enter" && handleSubmit(input.current);
            }}
          />
        </div>
        <div className={clsx(styles["input-wrapper-suffix"])}></div>
      </div>
    </div>
  );
};
