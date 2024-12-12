import { Button, ButtonProps } from "antd";
import clsx from "clsx";
import React from "react";

type TProps = {
  text: string;
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  classButton?: string;
} & ButtonProps

export const TextButton = ({
  text,
  onClick,
  isLoading,
  disabled,
  classButton,
  ...reset
}: TProps) => {
  return (
    <Button
      {...reset}
      loading={isLoading}
      onClick={onClick}
      className={clsx("font-semibold outline-unset h-auto", classButton)}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};
