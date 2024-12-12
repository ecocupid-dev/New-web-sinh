import { _format } from "@/components/utils";
import { countryList } from "@/config";
import { Button, Image, Typography } from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
const { Paragraph } = Typography;

type TProps = {
  data: TListArticleByCatId;
};

export const SlideItem = ({ data }: TProps) => {
  const countryTarget = countryList.find((item) => item.Id === +data.CountryId);
  return (
    <div className={styles["eco-readerStories-sl-slide"]}>
      <div className="relative">
        {countryTarget?.Id !== 0 && (
          <div className={styles["eco-readerStories-sl-slide-imageCountry"]}>
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
        {data?.Thumnail && (
          <div className={styles["eco-readerStories-sl-slide-image"]}>
            <Image
              src={data?.Thumnail}
              alt="eco-readerStories-image"
              width={"100%"}
              height={"100%"}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                borderRadius: "12px 12px 0 0",
              }}
            />
          </div>
        )}
      </div>
      <div className={styles["eco-readerStories-sl-slide-content"]}>
        <h3 className={styles["eco-readerStories-sl-slide-name"]}>
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
      <div className={styles["eco-readerStories-sl-slide-ft"]}>
        <div className={styles["eco-readerStories-sl-slide-author"]}>
          <Image
            src={data?.Author.Avatar}
            alt="image-eco-readerStories"
            className={styles["eco-readerStories-sl-slide-author-avatar"]}
          />
          <div className={styles["eco-readerStories-sl-slide-author-info"]}>
            <div className={styles["eco-readerStories-sl-slide-author-name"]}>
              {data?.Author?.UserName}
            </div>
            <div
              className={styles["eco-readerStories-sl-slide-author-created"]}
            >
              {_format.getTimeSince(data?.Created)}
            </div>
          </div>
        </div>
        <Link href={`${data.OgUrl}`} target="_blank">
          <Button className={styles["eco-readerStories-sl-slide-buttonMore"]}>
            <span
              className={styles["eco-readerStories-sl-slide-buttonMore-text"]}
            >
              read more
            </span>
            <Image
              src={"/icon/arrow-next.png"}
              alt="image-eco-readerStories-read-more"
              className={styles["eco-readerStories-sl-slide-buttonMore-icon"]}
              preview={false}
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};
