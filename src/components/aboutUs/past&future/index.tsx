import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Image } from "antd";

export const PastAndFuture = () => {
  return (
    <div className={clsx(styles["past-and-future"], "container")}>
      <div className="section-main-title">
        <h1>Our past & future</h1>
      </div>
      <div className={styles["past-and-future-boxs"]}>
        <div className={styles["past-and-future-box"]}>
          <span className={styles["past-and-future-box-circle"]} />
          <div className={styles["past-and-future-box-image"]}>
            <Image
              preview={false}
              src="/image/aboutus/past-future-01.svg"
              alt="eco-icon-01"
            />
          </div>
          <div className={styles["past-and-future-box-content"]}>
            <h3 className={styles["past-and-future-box-content-title"]}>
              Vision
            </h3>
            <p className={styles["past-and-future-box-content-para"]}>
              Become Southeast Asia’s leading environmental community through
              media
            </p>
          </div>
        </div>
        <div className={styles["past-and-future-box"]}>
          <span className={styles["past-and-future-box-circle"]} />

          <div className={styles["past-and-future-box-image"]}>
            <Image
              preview={false}
              src="/image/aboutus/past-future-02.svg"
              alt="eco-icon-02"
            />
          </div>
          <div className={styles["past-and-future-box-content"]}>
            <h3 className={styles["past-and-future-box-content-title"]}>
              Mission
            </h3>
            <p className={styles["past-and-future-box-content-para"]}>
              Build a social platform that connects eco-projects in Southeast
              Asia through multilingual written, video, & graphic media content
              that educate audiences to protect the environment{" "}
            </p>
          </div>
        </div>
        <div className={styles["past-and-future-box"]}>
          <span className={styles["past-and-future-box-circle"]} />

          <div className={styles["past-and-future-box-image"]}>
            <Image
              preview={false}
              src="/image/aboutus/past-future-03.svg"
              alt="eco-icon-03"
            />
          </div>
          <div className={styles["past-and-future-box-content"]}>
            <h3 className={styles["past-and-future-box-content-title"]}>
              Future
            </h3>
            <p className={styles["past-and-future-box-content-para"]}>
              Build a media agency and create a geodatabase of all the amazing
              eco-projects and leaders in Southeast Asia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
