import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Button, Image } from "antd";
import Link from "next/link";

export const Partner = () => {
  const data = [
    {
      Id: 1,
      Title: "I just want to share my project",
      Subtitle: "EcoCupid - Find your match today!",
      Image: "/image/partwithus/partner-with-us-01.svg",
      Des: "Be part of EcoCupid’s Southeast Asian environmental community. Get ready to connect with potential allies, friends, partners, and more. Tell us who you are and stand a chance to be featured with us. Everyone has a story that deserves to be told, especially if you’ve just started and need all the help you can get. EcoCupid wants you to be heard.",
      Link: "https://docs.google.com/forms/d/e/1FAIpQLSdDmCilWiCmZ_mR2EHACbs11VBLfYFi3rmVTPnZ4-JSNmgFtg/viewform",
    },
    {
      Id: 2,
      Title: "I want to collaborate",
      Subtitle: "EcoCupid - We heard you! Let’s talk.",
      Image: "/image/partwithus/partner-with-us-02.svg",
      Des: "Do we share the same eco-dream? Do you like our work? Let’s join hands and make Southeast Asia’s environment better. We offer media content, media skills training, and media strategy and proposal services, all custom-tailored for environmental projects. Why? Because we understand and care about the environment. EcoCupid wants you to succeed. ",
      Link: "https://docs.google.com/forms/d/e/1FAIpQLSdDmCilWiCmZ_mR2EHACbs11VBLfYFi3rmVTPnZ4-JSNmgFtg/viewform",
    },
    {
      Id: 3,
      Title: "I want to fund a CSR project",
      Subtitle: "EcoCupid - We know who can.",
      Image: "/image/partwithus/partner-with-us-03.svg",
      Des: "Take advantage of EcoCupid’s ever-growing environmental community. We know amazing, sustainable, and unique eco-projects in every country across Southeast Asia. Join us and get ready to connect with real people on the ground who need support. EcoCupid makes it easier for you to make a greener impact for our community. Find your right eco-match today!",
      Link: "https://docs.google.com/forms/d/e/1FAIpQLSdDmCilWiCmZ_mR2EHACbs11VBLfYFi3rmVTPnZ4-JSNmgFtg/viewform",
    },
  ];

  return (
    <div className={clsx(styles["partner"], "container")}>
      <div className="section-main-title">
        <h1>Partner with us</h1>
      </div>

      <div className={styles["partner-boxs"]}>
        {data?.map((item) => (
          <div className={styles["partner-box"]} key={item.Id}>
            <div className={styles["partner-box-content"]}>
              <h1 className={styles["partner-box-content-title"]}>
                {item.Title}
              </h1>
              <h2 className={styles["partner-box-content-subTitle"]}>
                {item.Subtitle}
              </h2>
              <p className={styles["partner-box-content-des"]}>{item.Des}</p>
              <Button className={styles["partner-box-content-button"]}>
                <Link
                  target="_blank"
                  className={styles["partner-box-content-button-link"]}
                  href={item.Link}
                >
                  Start
                </Link>
              </Button>
            </div>

            <div className={styles["partner-box-image"]}>
              <Image src={item.Image} alt={item.Image} preview={false} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
