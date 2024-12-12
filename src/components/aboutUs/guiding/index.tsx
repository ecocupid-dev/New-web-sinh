import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Image } from "antd";

export const Guiding = () => {
  return (
    <div className={styles["guiding"]}>
      <div className={clsx(styles["guiding-inner"], "container")}>
        <div className={styles["guiding-title"]}>
          <h1>Our guiding principles</h1>
        </div>

        <div className={styles["guiding-inner-boxs"]}>
          <div className={styles["guiding-inner-box"]}>
            <div className={styles["guiding-inner-box-image"]}>
              <Image
                preview={false}
                src="/image/aboutus/guiding-03.svg"
                alt="eco-icon-building-03"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <h3 className={styles["guiding-inner-box-title"]}>Connect</h3>
            <p className={styles["guiding-inner-box-para"]}>
              aspiring and early-stage environmentalists and their projects
              across Southeast Asia together and invite collaborations with
              philanthropic, consulting, and business institutions.
            </p>
          </div>
          <div className={styles["guiding-inner-box"]}>
            <div className={styles["guiding-inner-box-image"]}>
              <Image
                preview={false}
                src="/image/aboutus/guiding-02.svg"
                alt="eco-icon-building-02"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <h3 className={styles["guiding-inner-box-title"]}>Create</h3>
            <p className={styles["guiding-inner-box-para"]}>
              the voices of ambitious, impactful, and local Eco-Heroes in
              Southeast Asia through multilingual written, video, and graphic
              media content.
            </p>
          </div>
          <div className={styles["guiding-inner-box"]}>
            <div className={styles["guiding-inner-box-image"]}>
              <Image
                preview={false}
                src="/image/aboutus/guiding-01.svg"
                alt="eco-icon-building-01"
                width={'100%'}
                height={'100%'}
              />
            </div>
            <h3 className={styles["guiding-inner-box-title"]}>Educate</h3>
            <p className={styles["guiding-inner-box-para"]}>
              through educating our audiences across multiple languages and
              demographics about environmental information and solutions that
              inspire individual action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
