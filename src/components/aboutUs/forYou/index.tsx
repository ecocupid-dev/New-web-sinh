import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Image } from "antd";

export const ForYou = () => {
  return (
    <div className={clsx(styles["for-you"], "container")}>
      <div className="section-main-title">
        <h1>What can EcoCupid do for YOU?</h1>
      </div>
      <div className={styles["for-you-boxs"]}>
        <div className={styles["for-you-box"]}>
          <div className={styles["for-you-box-image"]}>
            <Image
              src="/image/aboutus/for-you-01.jpeg"
              alt="eco-image-about-us"
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "999px", objectFit: "cover" }}
            />
          </div>
          <h1 className={styles["for-you-box-title"]}>
            Feature articles and films
          </h1>
          <p className={styles["for-you-box-para"]}>
            We want to tell your environmental story through professional
            written and video media. Our professional video team consists of an
            international award-winning producer. We also have an environmental
            researcher that understands and cares deeply about science and the
            environment. So, EcoCupid media will have good production and
            accurate science. Guaranteed.
          </p>
        </div>
        <div className={styles["for-you-box"]}>
          <div className={styles["for-you-box-image"]}>
            <Image
              src="/image/aboutus/for-you-02.jpeg"
              alt="eco-image-about-us"
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "999px", objectFit: "cover" }}
            />
          </div>
          <h1 className={styles["for-you-box-title"]}>
            Media upskilling for environmentalists
          </h1>
          <p className={styles["for-you-box-para"]}>
            We can share our media skills with young environmental leaders
            across Southeast Asia. All of us at EcoCupid are leading
            environmentalists ourselves. We want to give back to society by
            guiding you there. We’ve all been there once.
          </p>
        </div>
        <div className={styles["for-you-box"]}>
          <div className={styles["for-you-box-image"]}>
            <Image
              src="/image/aboutus/for-you-03.jpeg"
              alt="eco-image-about-us"
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "999px", objectFit: "cover" }}
            />
          </div>
          <h1 className={styles["for-you-box-title"]}>
            Connect with environmentalists friends across Southeast Asia
          </h1>
          <p className={styles["for-you-box-para"]}>
            Join us and get to know more people flighting for the environment
            just like you in other countries within Southeast Asia. Our network
            can help you to reach out to unlikely friends and partners that you
            can learn from and collaborate someday.
          </p>
        </div>
      </div>
    </div>
  );
};
