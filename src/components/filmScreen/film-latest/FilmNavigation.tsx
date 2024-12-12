"use client";

import { Image } from "antd";
import clsx from "clsx";
import { useSwiper } from "swiper/react";
import styles from "./index.module.scss";

export const FilmNavigation = () => {
  const swiper = useSwiper();

  return (
    <div className={styles["film-latest-navigation"]}>
      <div
        className={clsx(
          styles["film-latest-navigation-button"],
          "film-latest-navigation-button"
        )}
        onClick={() => swiper.slidePrev()}
      >
        <div className={styles["film-latest-navigation-icon"]}>
          <Image
            src="/icon/video-arrow-left.svg"
            alt="arrow-previous-button"
            preview={false}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
      <div
        className={clsx(
          styles["film-latest-navigation-button"],
          "film-latest-navigation-button"
        )}
        onClick={() => swiper.slideNext()}
      >
        <div className={styles["film-latest-navigation-icon"]}>
          <Image
            src="/icon/video-arrow-right.svg"
            alt="arrow-next-button"
            preview={false}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
    </div>
  );
};
