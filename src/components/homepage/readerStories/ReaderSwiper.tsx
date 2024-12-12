"use client";

import clsx from "clsx";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./index.module.scss";
import { SlideItem } from "./SlideItem";

type TProps = {
  data: TListArticleByCatId[] | undefined;
};

export const ReaderSwiper = ({ data }: TProps) => {
  return (
    <div className={styles["eco-readerStories-sl"]}>
      <Swiper
        slidesPerView={1}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className={clsx(
          styles["eco-readerStories-sl-swiper"],
          "eco-readerStories-sl-swiper"
        )}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        // effect={"coverflow"}
      >
        {data?.map((item) => (
          <SwiperSlide key={item._id}>
            <SlideItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
