"use client";

import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { ourTeam } from "@/config";
import { Image, Typography } from "antd";
import Link from "next/link";
const { Paragraph } = Typography;

export const OurTeam = () => {
  return (
    <div className={styles["our-team"]}>
      <div className={clsx(styles["our-team-inner"], "container")}>
        <div className={styles["our-team-title"]}>
          <h1>Our team</h1>
        </div>
        {/* <div className={styles["our-team-shortDes"]}>
          <p>
            We have a journalist, documentary film-maker, programmer, business
            developer, and a designer from different ASEAN countries. <br />{" "}
            Round portraits with names and connect to the LinkedIn
          </p>
        </div> */}

        <div className={styles["our-team-list"]}>
          {ourTeam.map((member) => (
            <div key={member.Id} className={styles["our-team-item"]}>
              <Link
                href={member.LinkedIn}
                target="_blank"
                className={styles["our-team-item-linkedin"]}
              >
                <Image
                  src="/image/aboutus/linkedin.svg"
                  width={32}
                  height={32}
                  alt="eco-linkedid-icon"
                  preview={false}
                />
              </Link>
              <div className={styles["our-team-item-image"]}>
                <Image
                  src={member.Avatar}
                  alt={`eco-avatar-${member.Avatar}`}
                  preview={false}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <div className={styles["our-team-item-position"]}>
                <h3>{member.Position}</h3>
              </div>
              <div className={styles["our-team-item-name"]}>
                <h2>{member.Name}</h2>
              </div>
              <div className={styles["our-team-item-des"]}>
                <Paragraph
                  ellipsis={{
                    rows: 3,
                    expandable: true,
                    symbol: "View more",
                  }}
                  // className="text-center text-white"
                >
                  {member.Des}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
