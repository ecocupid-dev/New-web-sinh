import styles from "./index.module.scss";
import { Image } from "antd";
import clsx from "clsx";
import { ButtonMore } from "..";

export const IntroUs = () => {
  return (
    <div className={styles["eco-intro-us"]}>
      <div className={clsx(styles["eco-intro-us-inner"], "container")}>
        <div className={styles["eco-intro-us-svg"]}>
          <Image
            src={"/svg/intro-us.svg"}
            alt="eco-intro-us"
            preview={false}
            width={"100%"}
            height={"100%"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className={styles["eco-intro-us-content"]}>
          <h1 className={styles["eco-intro-us-title"]}>What is EcoCupid?</h1>
          <p className={styles["eco-intro-us-para"]}>
            An environmentalist-focused social network platform that curates
            inspirational projects and educational content through multilingual
            media.
          </p>
          <div className={styles["eco-intro-us-button"]}>
            <ButtonMore path="/" classContainer="xl:!mr-0"/>
          </div>
        </div>
      </div>
    </div>
  );
};
