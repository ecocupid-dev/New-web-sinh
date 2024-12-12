import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Image } from "antd";
import Link from "next/link";

export const JoinToday = () => {
  return (
    <div className={styles["join-today"]}>
      <div className={clsx(styles["join-today-inner"], "container")}>
        <div className={styles["join-today-svg"]}>
          <Image
            src={"/image/volunteers/volunteer-07.svg"}
            alt="eco-join-today"
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
        <div className={styles["join-today-content"]}>
          <h1 className={styles["join-today-content-title"]}>
            Volunteer with EcoCupid today!
          </h1>
          <p className={styles["join-today-content-para"]}>
            Thank you everyone who applied to be an EcoCupid volunteer! We are
            excited to receive so many applications and appreciate your passion
            for a greener future. We&apos;ll be in touch with you soon with more
            details and look forward to opening applications for our next season
            of volunteers around August 2023. If you have any questions, feel
            free to contact us at {" "}
            <Link
              className={styles["join-today-content-email"]}
              href={"mailto:enquiry@ecocupid-asean.com"}
              target="_blank"
            >
               enquiry@ecocupid-asean.com
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
