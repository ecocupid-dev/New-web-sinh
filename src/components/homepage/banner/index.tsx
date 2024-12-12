"use client";

import { Modal } from "antd";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./index.module.scss";

const dataImage = [
  {
    Id: 1,
    ImageURL: "/banner/1.webp",
  },
  {
    Id: 2,
    ImageURL: "/banner/2.webp",
  },
  {
    Id: 3,
    ImageURL: "/banner/3.webp",
  },
  {
    Id: 4,
    ImageURL: "/banner/4.webp",
  },
  {
    Id: 5,
    ImageURL: "/banner/5.webp",
  },
  {
    Id: 6,
    ImageURL: "/banner/6.webp",
  },
];

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VIDEOLINK =
  "https://www.youtube.com/embed/bC4qE9mdTmA?si=q35IGeSqC5V-hZxN";

export const Banner = () => {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef<any>(null);
  const handleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (showModal === true) {
      // setVideoLink(VIDEOLINK);
      const videoElm = document.querySelector("#eco-video-iframe")
      if (videoElm) {
        videoElm.setAttribute('src', VIDEOLINK)
      }
    } else {
      const videoElm = document.querySelector("#eco-video-iframe")
      if (videoElm) {
        videoElm.setAttribute('src', '')
      }
    }
  }, [showModal]);

  return (
    <div className={clsx(styles["banner-swiper"], "container")}>
      <div className={styles["banner-swiper-img"]}>
        <Swiper
          className={styles["banner-swiper-container"]}
          loop={true}
          modules={[EffectFade, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          effect={"fade"}
        >
          {dataImage.map((item) => (
            <SwiperSlide key={item.Id}>
              <div className={styles["banner-swiper-item"]}>
                <Image
                  src={item.ImageURL}
                  layout="fill"
                  alt="banner picture"
                  objectFit="cover"
                  fill={true}
                  className="rounded-[12px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={clsx(styles["banner-swiper-content"], "")}>
        <h1 className={styles["banner-swiper-content-title"]}>
          THIS IS HOW WE CAN HELP YOU
        </h1>
        <div
          className={styles["banner-swiper-content-button"]}
          onClick={handleModal}
        >
          <div className={styles["banner-swiper-content-button-text"]}>
            watch now
          </div>
          <Image
            className={styles["banner-swiper-content-button-image"]}
            src={"/icon/play-video.png"}
            alt="watch more arrow icon"
            width={24}
            height={24}
          />
        </div>
      </div>

      <Modal
        centered
        open={showModal}
        onCancel={handleModal}
        className={styles["banner-swiper-modal"]}
        closeIcon={null}
        footer={null}
      >
        <iframe
          ref={videoRef}
          width={"100%"}
          height={"500px"}
          src={VIDEOLINK}
          title="EcoCupid 2023"
          id="eco-video-iframe"
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </Modal>
    </div>
  );
};
