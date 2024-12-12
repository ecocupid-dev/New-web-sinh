import { homeAPI } from "@/api";
import { countryList } from "@/config";
import { Image } from "antd";
import clsx from "clsx";
import { _format } from "../utils";
import styles from "./index.module.scss";
import Link from "next/link";

type TProps = {
  catID: string;
  isEcoStories: boolean;
};

async function getArticleByCatId(id: string, isEcoStories: boolean) {
  try {
    let res;

    if (isEcoStories) {
      res = await homeAPI.getEcoArticleWithoutCatIDlist({
        CategoryId: id,
        IsFeature: true,
        Limit: 3,
      });
    } else {
      res = await homeAPI.getEcoArticleByCatIDlist({
        CategoryId: id,
        Limit: 3,
        IsFeature: true,
      });
    }
    return res.Data;
  } catch (error) {
    return [];
  }
}

const Item = ({
  item,
  catName,
  catColor,
  index,
}: {
  item: TListArticleByCatId;
  catName: string;
  catColor: string;
  index: number;
}) => {
  const countryTarget = countryList.find(
    (country) => country.Id === item?.CountryId
  );

  return (
    <Link
      href={`${item.OgUrl}`}
      target="_blank"
      className={clsx(
        styles["cateImpactful-main-item"],
        index === 1
          ? "!col-span-full lg:!col-span-6"
          : "!col-span-full lg:!col-span-3"
      )}
    >
      {countryTarget?.FlagImage && (
        <div className={clsx(styles["cateNewest-flag"], "left-[0.8rem]")}>
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
          styles["cateImpactful-main-item-thumnail"],
          index === 1 ? "!h-[340px] lg:!h-[400px]" : "!h-[340px] lg:!h-[240px]"
        )}
      >
        <Image
          alt={item.Thumnail}
          src={item.Thumnail}
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className={styles["cateImpactful-main-item-content"]}>
        <ul className={styles["cateImpactful-main-item-content-tags"]}>
          <li
            style={{
              background: "#FEFBEB",
              color: catColor,
            }}
            className={styles["cateImpactful-main-item-content-tag"]}
          >
            {catName}
          </li>
          {item.Tags.map((tag) => (
            <li
              key={tag}
              className={styles["cateImpactful-main-item-content-tag"]}
            >
              {tag}
            </li>
          ))}
        </ul>
        <h1 className={styles["cateImpactful-main-item-content-title"]}>
          {item.Title}
        </h1>

        <p className={styles["cateImpactful-main-item-content-para"]}>
          {item.Summary}
        </p>

        <div className={styles["cateImpactful-main-item-content-author"]}>
          <Image
            src={item?.Author.Avatar}
            alt={`${item?.Author.Avatar}-avatar`}
            className={styles["cateImpactful-main-item-content-author-avatar"]}
          />
          <div
            className={styles["cateImpactful-main-item-content-author-info"]}
          >
            <div
              className={styles["cateImpactful-main-item-content-author-name"]}
            >
              {item?.Author?.UserName}
            </div>
            <div
              className={
                styles["cateImpactful-main-item-content-author-created"]
              }
            >
              {_format.getDate(item?.Created)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const CateFeature = async ({ catID, isEcoStories }: TProps) => {
  const resData = await getArticleByCatId(catID, isEcoStories);

  if (!resData || resData?.length <= 0) return <></>;

  return (
    <>
      <div className={clsx(styles["cateImpactful"], "mb-4")}>
        <div className={styles["cateImpactful-head"]}>
          <div className={"section-main-title w-full"}>
            <h1>
              Featured {isEcoStories ? "Eco-Stories" : resData[0]?.CatName}
            </h1>
          </div>
        </div>

        <div className={styles["cateImpactful-main"]}>
          <div className={styles["cateImpactful-main-list"]}>
            {resData.map((data, index) => (
              <Item
                key={data._id}
                item={data}
                index={index}
                catName={isEcoStories ? "Eco-Stories" : resData[0]?.CatName}
                catColor={isEcoStories ? "green" : resData[0]?.CatColor}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
