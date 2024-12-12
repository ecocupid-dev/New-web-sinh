import { Button, Image } from "antd";
import clsx from "clsx";
import React from "react";
import styles from "./index.module.scss";

type TProps = {
  type: "trash" | "edit" | "logout";
  onClick?: () => void; 
  disabled?: boolean;
  isLoading?: boolean;
};

const dataIcon = {
  trash: {
    url: "/func/trash.svg",
    color: "red",
  },
  edit: {
    url: "/func/edit.svg",
    color: "#004737",
  },
  logout: {
    url: "/func/logout.svg",
    color: "red",
  },
};

export const IconButton = ({ type, onClick, disabled, isLoading }: TProps) => {
  const iconSrc = dataIcon[type];
  const color = iconSrc.color;

  const style = {
    "--color": color,
  } as React.CSSProperties;

  return (
    <Button
      className={clsx(styles["icon-button"])}
      style={style}
      onClick={onClick}
      disabled={disabled}
      loading={isLoading}
    >
      <Image
        src={iconSrc.url}
        alt="eco-icon-button"
        width={20}
        height={20}
        preview={false}
      />
    </Button>
  );
};
