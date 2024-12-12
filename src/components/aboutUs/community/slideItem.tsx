import React from "react";
import styles from "./index.module.scss";
import { Button, Image, Typography } from "antd";
import Link from "next/link";

const { Paragraph } = Typography;

type TProps = {
  Id: number;
  Name: string;
  Des: string;
  Avatar: string;
};

export const SlideItem = (item: TProps) => {
  return (
    <div className={styles["community-slide"]}>
      <div className={styles["community-sl-slide-image"]}>
        <Image
          src={"error"}
          alt="community-image"
          fallback={item.Avatar}
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className={styles["community-sl-slide-content"]}>
        <h3 className={styles["community-sl-slide-name"]}>{item.Name}</h3>
        <Paragraph
          ellipsis={{
            rows: 4,
            expandable: true,
            symbol: "Show more",
          }}
        >
          {item.Des}
        </Paragraph>
      </div>
      {/* <Link href={"/"}>
        <Button className={styles["community-sl-slide-buttonMore"]}>
          <span className={styles["community-sl-slide-buttonMore-text"]}>
            read more
          </span>
          <Image
            src={"/icon/arrow-next.png"}
            alt="image-community-read-more"
            className={styles["community-sl-slide-buttonMore-icon"]}
            preview={false}
          />
        </Button>
      </Link> */}
    </div>
  );
};
