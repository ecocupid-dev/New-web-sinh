"use client";

import clsx from "clsx";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./index.module.scss";
import { Image } from "antd";
import Link from "next/link";
import { FilmNavigation } from "./FilmNavigation";

type TProps = {
  data: THomeVideo[];
};

const Item = ({ data }: { data: THomeVideo }) => {
  return (
    <Link
      href={`/video/${data.OgUrl}`}
      target="_blank"
      className={styles["film-latest-item"]}
    >
      <div className={styles["film-latest-item-thumnail"]}>
        <Image
          src={data?.Thumnail}
          alt="eco-film-thumnail"
          width={"100%"}
          height={"100%"}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles["film-latest-item-content"]}>
        <ul className={styles["film-latest-item-tags"]}>
          {data?.Tags.map((tag) => (
            <li key={tag} className={styles["film-latest-item-tag"]}>
              {tag}
            </li>
          ))}
        </ul>
        <h1 className={styles["film-latest-item-title"]}>{data?.Title}</h1>
        <p className={styles["film-latest-item-para"]}>{data?.Summary}</p>
      </div>
    </Link>
  );
};

export const FilmLatestSwiper = ({ data }: TProps) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        allowTouchMove
        spaceBetween={20}
        // watchSlidesProgress={true}
        speed={1200}
        // pagination={pagination}
        // centeredSlides
        loop={true}
        modules={[Navigation]}
        // navigation={true}
        className={clsx(styles["film-latest-swiper"], "film-latest-swiper")}
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
            <Item data={item} />
          </SwiperSlide>
        ))}
        {data.length > 3 && <FilmNavigation />}
      </Swiper>
    </>
  );
};
