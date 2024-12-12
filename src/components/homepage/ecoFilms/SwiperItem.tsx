"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./index.module.scss";

type TSwiperCompnent = {
  data: THomeVideo[];
  dir: string;
  centeredSlides: boolean;
  delay?: number;
};

export const SwiperComponent = ({
  data,
  dir,
  centeredSlides,
  delay = 4000,
}: TSwiperCompnent) => {
  const breakpoints = {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1208: {
      slidesPerView: 4,
    },
  };

  return (
    <div className={clsx(styles["eco-film-swiperWrapper"])}>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        dir={dir}
        centeredSlides={centeredSlides}
        loop={true}
        // modules={[Autoplay]}
        // autoplay={{
        //   delay: delay,
        //   disableOnInteraction: false,
        // }}
        className={clsx(styles["eco-film-swiper"])}
        breakpoints={breakpoints}
      >
        {data.map((item) => (
          <SwiperSlide key={item._id} className="rounded-2xl overflow-hidden">
            <div className={clsx(styles["eco-film-slide"])}>
              <Image
                src={item.Thumnail}
                alt="Image Eco-Films"
                fill={true}
                objectFit="cover"
              />
              <Link href={`/video${item.OgUrl}`} className={styles["eco-film-link"]} target="_blank">
                <Image
                  alt="icon play eco films"
                  src={"/icon/ecoFilm-play.gif"}
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
