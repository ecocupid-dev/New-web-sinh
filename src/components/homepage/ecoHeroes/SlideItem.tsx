"use client";

import { Button, Image, Pagination, Typography } from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import clsx from "clsx";

const { Paragraph } = Typography;

// const SlideItem = (item: THomeHeroes) => {
//   return (
//     <div className={styles["eco-heroes-sl-slide"]}>
//       <div className={styles["eco-heroes-sl-slide-image"]}>
//         <Image
//           src={"error"}
//           alt="eco-heroes-image"
//           fallback={item.Thumnail}
//           width={"100%"}
//           height={"100%"}
//           style={{
//             objectFit: "cover",
//             width: "100%",
//             height: "100%",
//           }}
//         />
//       </div>
//       <div className={styles["eco-heroes-sl-slide-content"]}>
//         <h3 className={styles["eco-heroes-sl-slide-name"]}>{item.Title}</h3>
//         <Paragraph
//           ellipsis={{
//             rows: 4,
//             expandable: true,
//             symbol: "Show more",
//           }}
//         >
//           {item.Summary}
//         </Paragraph>
//       </div>
//       <Link href={"/"}>
//         <Button className={styles["eco-heroes-sl-slide-buttonMore"]}>
//           <span className={styles["eco-heroes-sl-slide-buttonMore-text"]}>
//             read more
//           </span>
//           <Image
//             src={"/icon/arrow-next.png"}
//             alt="image-eco-heroes-read-more"
//             className={styles["eco-heroes-sl-slide-buttonMore-icon"]}
//             preview={false}
//           />
//         </Button>
//       </Link>
//     </div>
//   );
// };

type TProps = {
  data: THomeHeroes[];
};

export const EcoHerosSwiper = ({ data }: TProps) => {
  return (
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
        depth: 140,
        modifier: 1,
      }}
      breakpoints={{
        "768": {
          slidesPerView: 2,
        },
        "1024": {
          slidesPerView: 3,
        },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      className={clsx(styles["eco-heroes-sl-swiper"], "eco-heroes-sl-swiper")}
    >
      {/* {data?.map((item) => (
        <SwiperSlide key={item._id}>
          <SlideItem {...{ ...item }} />
        </SwiperSlide>
      ))} */}
    </Swiper>
  );
};
