"use client";

import clsx from "clsx";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationButtonsMemo } from "./NavigationButtons";
import { SlideItemMemo } from "./SlideItem";
import styles from "./index.module.scss";

type TProps = {
  data: TListArticleByCatId[] | undefined;
};

export const StoriesSwiper = ({ data }: TProps) => {
  return (
    <div className={styles["eco-stories-sl"]}>
      <Swiper
        slidesPerView={1}
        allowTouchMove
        spaceBetween={20}
        watchSlidesProgress={true}
        speed={1200}
        // pagination={pagination}
        centeredSlides
        loop={true}
        modules={[Navigation]}
        // navigation={true}
        className={clsx(
          styles["eco-stories-sl-swiper"],
          "eco-stories-sl-swiper"
        )}
        breakpoints={{
          "768": {
            slidesPerView: 2,
          },
          "1440": {
            slidesPerView: 3,
          },
        }}
      >
        {data?.map((item) => (
          <SwiperSlide key={item._id}>
            <SlideItemMemo data={item} />
          </SwiperSlide>
        ))}
        <NavigationButtonsMemo />
      </Swiper>
    </div>
  );
};
