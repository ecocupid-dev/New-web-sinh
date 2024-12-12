import React from "react";
import styles from "./index.module.scss";
import { Image } from "antd";

export const Sidebar = () => {
  const lists = [
    {
      Id: 1,
      Icon: "/image/volunteers/volunteer-01.svg",
      Content:
        "Certificate from YSEALI – U.S. Mission to ASEAN, the U.S. government’s signature program to strengthen leadership development and networking in Southeast Asia.",
    },
    {
      Id: 2,
      Icon: "/image/volunteers/volunteer-02.svg",
      Content: "Souvenir from EcoCupid.",
    },
    {
      Id: 3,
      Icon: "/image/volunteers/volunteer-03.svg",
      Content:
        "Be part of a solution to create a greener future for Southeast Asia.",
    },
    {
      Id: 4,
      Icon: "/image/volunteers/volunteer-04.svg",
      Content:
        "Connect and work with various environmental organisations, such as NGOs, governments, private sector, and academia.",
    },
    {
      Id: 5,
      Icon: "/image/volunteers/volunteer-05.svg",
      Content:
        "Have friends from countries all over Southeast Asia. Be nice and they may host you when you travel in their countries.",
    },
    {
      Id: 6,
      Icon: "/image/volunteers/volunteer-06.svg",
      Content: "Practice and improve your English and media skills.",
    },
  ];

  return (
    <div className={styles["volunteer-sidebar"]}>
      <div className={styles["volunteer-sidebar-content"]}>
        <div className={styles["volunteer-sidebar-content-title"]}>
          <h3>Volunteer Benefits</h3>
        </div>
        <div className={styles["volunteer-sidebar-content-list"]}>
          {lists.map((item) => (
            <div
              key={item.Id}
              className={styles["volunteer-sidebar-content-item"]}
            >
              <div className={styles["volunteer-sidebar-content-item-icon"]}>
                <Image
                  src={item.Icon}
                  alt="eco-icon-volunteers"
                  preview={false}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <p className={styles["volunteer-sidebar-content-item-para"]}>
                {item.Content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
