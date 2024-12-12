"use client";

import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { SlideItem } from "./slideItem";
import { communityData } from "@/config";

export const Community = () => {
  return (
    <div className={styles["community"]}>
      <div className={clsx(styles["community-inner"], "container")}>
        <div className={styles["community-title"]}>
          <h1>EcoCupid community</h1>
        </div>
        <div className={styles["community-sl"]}>
          <Swiper
            effect={"coverflow"}
            slidesPerView={1}
            speed={1200}
            spaceBetween={20}
            loop={true}
            watchSlidesProgress={true}
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 40,
              // stretch: 0,
              depth: 160,
              modifier: 1,
            }}
            breakpoints={{
              "768": {
                slidesPerView: 2,
              },
              "1024": {
                slidesPerView: 2,
              },
              '1440': {
                slidesPerView: 3
              }
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className={clsx(
              styles["community-sl-swiper"],
              "community-sl-swiper"
            )}
          >
            {communityData.map((item) => (
              <SwiperSlide key={item.Id}>
                <SlideItem
                  Id={item.Id}
                  Name={item.Name}
                  Des={item.Des}
                  Avatar={item.Avatar}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
