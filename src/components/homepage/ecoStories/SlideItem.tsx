import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Image, Button } from "antd";
import Link from "next/link";
import { countryList } from "@/config";
import { _format } from "@/components/utils";

type TProps = {
  data: TListArticleByCatId;
};
const SlideItem = ({ data }: TProps) => {
  const countryTarget = countryList.find((item) => item.Id === +data.CountryId);

  return (
    <div
      className={clsx(styles["eco-stories-sl-slide"], "eco-stories-sl-slide")}
    >
      <div className="relative">
        <Image
          src={data?.Thumnail}
          alt="image-eco-stories"
          className={styles["eco-stories-sl-slide-image"]}
        />
        {countryTarget?.FlagImage && (
          <div className={styles["eco-stories-sl-slide-imageCountry"]}>
            <Image
              src={"error"}
              alt="eco-stories-country-image"
              height={"100%"}
              width={"100%"}
              preview={false}
              fallback={countryTarget?.FlagImage}
              style={{ objectFit: "cover", borderRadius: "999px" }}
            />
          </div>
        )}
        <h4
          className={clsx(styles["eco-stories-sl-slide-category"])}
          style={{ background: data?.CatColor }}
        >
          {data?.CatName}
        </h4>
      </div>
      <div className={styles["eco-stories-sl-slide-content"]}>
        <div className={styles["eco-stories-sl-slide-tags"]}>
          {data?.Tags.map((tag) => (
            <h6 key={tag} className={styles["eco-stories-sl-slide-tag"]}>
              {tag}
            </h6>
          ))}
        </div>

        <h2 className={styles["eco-stories-sl-slide-title"]}>
          <Link href={`${data.OgUrl}`} target="_blank">
            {data?.Title}
          </Link>
        </h2>
        <p
          className={clsx(styles["eco-stories-sl-slide-shortDes"], "text-dot")}
        >
          {data?.Summary}
        </p>
        <div className={styles["eco-stories-sl-slide-ft"]}>
          <div className={styles["eco-stories-sl-slide-author"]}>
            <Image
              src={data?.Author.Avatar}
              alt="image-eco-stories"
              className={styles["eco-stories-sl-slide-author-avatar"]}
            />
            <div className={styles["eco-stories-sl-slide-author-info"]}>
              <div className={styles["eco-stories-sl-slide-author-name"]}>
                {data?.Author?.UserName}
              </div>
              <div className={styles["eco-stories-sl-slide-author-created"]}>
                {_format.getTimeSince(data?.Created)}
              </div>
            </div>
          </div>
          <Link href={`${data.OgUrl}`} target="_blank">
            <Button className={styles["eco-stories-sl-slide-buttonMore"]}>
              <span className={styles["eco-stories-sl-slide-buttonMore-text"]}>
                read more
              </span>
              <Image
                src={"/icon/arrow-next.png"}
                alt="image-eco-stories-read-more"
                className={styles["eco-stories-sl-slide-buttonMore-icon"]}
                preview={false}
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const SlideItemMemo = React.memo(SlideItem);
