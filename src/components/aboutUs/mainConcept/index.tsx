import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Image } from "antd";

export const MainConcept = () => {
  return (
    <div className={clsx(styles["main-concept"], "container")}>
      <div className={styles["main-concept-left"]}>
        <div
          className={clsx(styles["main-concept-title"], "section-main-title")}
        >
          <h1>Main Concept</h1>
        </div>
        <div className={styles["main-concept-left-paras"]}>
          <p className={clsx(styles["main-concept-left-para"], "mb-8")}>
            Meet <b>EcoCupid</b> – your go-to platform for connecting with
            eco-projects in Southeast Asia. We write and film their green ideas
            on our social platforms, and train environmentalists to spread their
            love for the environment beyond language and country borders.
          </p>
          <p className={styles["main-concept-left-para"]}>
            <b>EcoCupid</b> is Southeast Asia’s environmentalist-focused social
            network platform that curates inspirational eco-projects and
            educational content through multilingual media. We are an
            environmental media project.
          </p>
        </div>
      </div>

      <div className={styles["main-concept-right"]}>
        <Image src="/logo.png" alt="eco-logo-about-us" preview={false} />
      </div>
    </div>
  );
};
