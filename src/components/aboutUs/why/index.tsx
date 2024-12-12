import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Image } from "antd";

export const WhyHaveName = () => {
  return (
    <div className={clsx(styles["why-name"], "container")}>
      <div className={styles["why-name-left"]}>
        <div className={styles["why-name-left-image"]}>
          <Image
            src="/image/aboutus/why-name.png"
            alt="eco-why-having-name-EcoCupid?"
            preview={false}
          />
        </div>
      </div>

      <div className={styles["why-name-right"]}>
        <div className={styles["why-name-title"]}>
          <div className="section-main-title !m-0">
            <h1>Why the name</h1>
          </div>
          <div className="section-main-title !m-0">
            <h1>EcoCupid?</h1>
          </div>
        </div>
        <p className={styles["why-name-para"]}>
          We had a pen, and we had a burger. On a greasy Burger King® serviette,
          EcoCupid was born. (We are not sponsored by Burger King®)
        </p>
        <p className={styles["why-name-para"]}>
          <span className={styles["why-name-para-brand"]}>‘Eco’ </span> because
          we want to make positive change for the environment
        </p>
        <p className={styles["why-name-para"]}>
          <span className={styles["why-name-para-brand"]}>‘Cupid’ </span>
          because we’re all looking for love and we want a similar platform for
          the environment
        </p>
      </div>
    </div>
  );
};
