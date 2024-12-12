"use client";

import "@/styles/categories.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./index.module.scss";
import { SlideItem } from "./SlideItem";

type TProps = {
  data: TListArticleByCatId[];
};

export const CategoriesSwiper = ({ data }: TProps) => {
  const [dataRender, setDataRender] = useState(data);

  useEffect(() => {
    setDataRender(data);
  }, [data]);

  return (
    <div className={styles["eco-categories-sl"]}>
      <Swiper
        slidesPerView={1}
        allowTouchMove
        spaceBetween={20}
        speed={1200}
        loop={true}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className={clsx(
          styles["eco-categories-sl-swiper"],
          "eco-categories-sl-swiper"
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
        {dataRender?.map((item) => (
          <SwiperSlide key={item._id}>
            <SlideItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};
