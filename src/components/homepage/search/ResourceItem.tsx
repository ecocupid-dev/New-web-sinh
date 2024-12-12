import { countryList } from "@/config";
import Link from "next/link";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Image, Tag } from "antd";
import { ESearchResourceType } from "@/enum/home";
import { _format } from "@/components/utils";

export const ResourceItem = ({ item }: { item: TCommonResource }) => {
  const countryTarget = countryList.find(
    (country) => country.Id === item?.CountryId
  );

  return (
    <Link
      href={
        item?.ResourceType === ESearchResourceType.EcoFilms
          ? `/video/${item.OgUrl}`
          : `${item.OgUrl}`
      }
      target="_blank"
      className={styles["itemWrapper-main-item"]}
    >
      {countryTarget?.FlagImage && (
        <div className={clsx(styles["itemWrapper-flag"], "left-[0.8rem]")}>
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
      <div className={styles["itemWrapper-main-item-thumnail"]}>
        <Image
          alt={item.Thumnail}
          src={item.Thumnail}
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "cover",
          }}
        />
        <div className="absolute top-3 right-3">
          <ResourceTag type={item?.ResourceType} />
        </div>
      </div>
      <div className={styles["itemWrapper-main-item-content"]}>
        <ul className={styles["itemWrapper-main-item-content-tags"]}>
          {item?.Tags?.map((tag) => (
            <li
              key={tag}
              className={styles["itemWrapper-main-item-content-tag"]}
            >
              {tag}
            </li>
          ))}
        </ul>
        <h1 className={styles["itemWrapper-main-item-content-title"]}>
          {item?.Title}
        </h1>

        <p className={styles["itemWrapper-main-item-content-para"]}>
          {item?.Summary}
        </p>

        {item?.ResourceType !== ESearchResourceType.EcoFilms ? (
          <div className={styles["itemWrapper-main-item-content-author"]}>
            <Image
              src={item?.Author?.Avatar}
              alt={`${item?.Author?.Avatar}-avatar`}
              className={styles["itemWrapper-main-item-content-author-avatar"]}
            />
            <div
              className={styles["itemWrapper-main-item-content-author-info"]}
            >
              <div
                className={styles["itemWrapper-main-item-content-author-name"]}
              >
                {item?.Author?.UserName}
              </div>
              <div
                className={
                  styles["itemWrapper-main-item-content-author-created"]
                }
              >
                {_format.getDate(item?.Created)}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={styles["itemWrapper-main-item-content-author-created"]}
          >
            {_format.getDate(item?.Created)}
          </div>
        )}
      </div>
    </Link>
  );
};

const ResourceTag = ({ type }: { type?: ESearchResourceType }) => {
  switch (type) {
    case ESearchResourceType.EcoFilms:
      return (
        <Tag className="py-1 px-3 mr-0 rounded-xl font-medium" color="blue">
          Eco-Films
        </Tag>
      );
    case ESearchResourceType.EcoStories:
      return (
        <Tag className="py-1 px-3 mr-0 rounded-xl font-medium" color="purple">
          Eco-Stories
        </Tag>
      );
    case ESearchResourceType.OurReaderStories:
      return (
        <Tag className="py-1 px-3 mr-0 rounded-xl font-medium" color="green">
          {`Our Readers’ Stories`}
        </Tag>
      );
    default:
      return <></>;
  }
};
