import clsx from "clsx";
import Image from "next/image";
import React from "react";
import styles from './index.module.scss'

type TProps = {
  src: string;
  alt?: string;
  size?: {
    width: number;
    height: number;
  };
  className?: string;
  onClick?: () => void
};

export const Icon = ({
  src,
  alt = "icon",
  size = {
    width: 16,
    height: 16,
  },
  className,
  onClick
}: TProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={size.width}
      height={size.width}
      className={clsx(className, styles.icon)}
      onClick={onClick}
    />
  );
};
