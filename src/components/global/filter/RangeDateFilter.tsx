"use client";

import { DatePicker } from "antd";
import clsx from "clsx";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import { RangePickerProps } from "antd/es/date-picker";
const { RangePicker } = DatePicker;

type TRangeDateFilter = {
  handleDate: (val: (number | null | undefined)[]) => void;
  format?: string;
  label?: string;
  labelStyles?: string;
  dateWapperStyles?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: [string, string] | string;
  suffix?: React.ReactNode;
  suffixClassName?: string;
  allowClear?: boolean;
} & RangePickerProps;

export const RangeDateFilter = ({
  handleDate,
  format = "MM-DD-YYYY",
  disabled = false,
  suffix,
  suffixClassName,
  label = "",
  labelStyles,
  allowClear = false,
  required = false,
  dateWapperStyles,
  placeholder = ["From Date", "To Date"],
  ...rest
}: TRangeDateFilter) => {
  return (
    <div className={clsx(styles["rankDate-wrapper"], dateWapperStyles)}>
      {label && (
        <label className={clsx(styles["label"], labelStyles)}>
          <div className={styles["label-name"]}>{label}</div>
          {required && <span className={styles["label-required"]}>*</span>}
        </label>
      )}
      <div className={styles["rankDate-wrapper-main"]}>
        <RangePicker
          {...rest}
          // value={value ? dayjs(value, format) : undefined}
          format={format}
          placeholder={placeholder}
          className={styles["rankDate-wrapper-datePicker"]}
          onChange={(date, dateString) => {
            if (date === null) handleDate([undefined, undefined]);

            if (date) {
              const dateFrom = dayjs(date[0]).valueOf();
              const dateTo = dayjs(date[1]).valueOf();

              if (dateFrom && dateTo) {
                handleDate([dateFrom, dateTo]);
              }
            }
          }}
        />
        {suffix && (
          <div
            className={clsx(styles["rankDate-wrapper-suffix"], suffixClassName)}
          >
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};
