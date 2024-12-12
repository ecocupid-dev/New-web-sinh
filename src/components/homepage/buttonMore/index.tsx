import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { Image } from "antd";

type TProps = {
  path: string;
  classContainer?: string;
  text?: string;
  showArrow?: boolean;
};

export const ButtonMore = ({
  path,
  classContainer,
  text = "view all",
  showArrow = true,
}: TProps) => {
  return (
    <Link
      href={path}
      target="_blank"
      className={clsx(styles["buttonMore"], classContainer)}
    >
      <span>{text}</span>
      {showArrow && (
        <Image
          src="/icon/arrow-next.png"
          width={"24px"}
          // height={'100%'}
          alt="eco-arrow-next"
          preview={false}
        />
      )}
    </Link>
  );
};
