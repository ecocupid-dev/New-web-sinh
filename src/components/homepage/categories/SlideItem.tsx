import { countryList } from "@/config";
import { Button, Image, Typography } from "antd";
import clsx from "clsx";
import Link from "next/link";
import styles from "./index.module.scss";
import { _format } from "@/components/utils";

const { Paragraph } = Typography;

type TProps = {
  data: TListArticleByCatId;
};

export const SlideItem = ({ data }: TProps) => {
  const countryTarget = countryList.find((item) => item.Id === +data.CountryId);

  return (
    <div className={styles["eco-categories-sl-slide"]}>
      <div className="relative">
        {countryTarget?.FlagImage && (
          <div className={styles["eco-categories-sl-slide-imageCountry"]}>
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
        <div
          className={clsx(
            styles["eco-categories-sl-slide-image"],
            "eco-categories-sl-slide-image"
          )}
        >
          <Image
            src={data.Thumnail}
            alt="eco-categories-image"
            className="hello"
            // width={"100%"}

            // height={"100%"}
            style={{
              position: "absolute",
              inset: "0px",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "12px 12px 0 0",
            }}
          />
        </div>
        <h4
          className={styles["eco-categories-sl-slide-category"]}
          style={{ background: data.CatColor }}
        >
          {data.CatName}
        </h4>
      </div>
      <div className={styles["eco-categories-sl-slide-content"]}>
        <div className={styles["eco-categories-sl-slide-tags"]}>
          {data?.Tags.map((tag) => (
            <h6 key={tag} className={styles["eco-categories-sl-slide-tag"]}>
              {tag}
            </h6>
          ))}
        </div>
        <h3 className={styles["eco-categories-sl-slide-name"]}>
          {data?.Title}
        </h3>
        <Paragraph
          ellipsis={{
            rows: 3,
            expandable: true,
            symbol: "Show more",
          }}
        >
          {data?.Summary}
        </Paragraph>
      </div>
      <div className={styles["eco-categories-sl-slide-ft"]}>
        <div className={styles["eco-categories-sl-slide-author"]}>
          <Image
            src={data?.Author.Avatar}
            alt="image-eco-categories"
            className={styles["eco-categories-sl-slide-author-avatar"]}
          />
          <div className={styles["eco-categories-sl-slide-author-info"]}>
            <div className={styles["eco-categories-sl-slide-author-name"]}>
              {data?.Author.UserName}
            </div>
            <div className={styles["eco-categories-sl-slide-author-created"]}>
              {_format.getTimeSince(data?.Created)}
            </div>
          </div>
        </div>
        <Link href={`${data.OgUrl}`} target="_blank">
          <Button className={styles["eco-categories-sl-slide-buttonMore"]}>
            <span className={styles["eco-categories-sl-slide-buttonMore-text"]}>
              read more
            </span>
            <Image
              src={"/icon/arrow-next.png"}
              alt="image-eco-categories-read-more"
              className={styles["eco-categories-sl-slide-buttonMore-icon"]}
              preview={false}
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};
