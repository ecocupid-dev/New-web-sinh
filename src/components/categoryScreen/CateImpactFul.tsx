import { homeAPI } from "@/api";
import { countryList } from "@/config";
import { Image } from "antd";
import clsx from "clsx";
import { ButtonMore } from "../homepage";
import { _format } from "../utils";
import styles from "./index.module.scss";
import Link from "next/link";
import { EMultipleResourcesSort, ESearchResourceType } from "@/enum/home";

type TProps = {
  catID: string;
  isEcoStories: boolean;
};

async function getArticleByCatId(id: string, isEcoStories: boolean) {
  try {
    let res;

    if (isEcoStories) {
      // If eco-stories
      res = await homeAPI.getEcoArticleWithoutCatIDlist({
        CategoryId: id,
        IsMostView: true,
        Limit: 3,
      });
    } else {
      res = await homeAPI.getEcoArticleByCatIDlist({
        CategoryId: id,
        IsMostView: true,
        Limit: 3,
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
}: {
  item: TListArticleByCatId;
  catName: string;
  catColor: string;
}) => {
  const countryTarget = countryList.find(
    (country) => country.Id === item?.CountryId
  );

  return (
    <Link
      href={`${item.OgUrl}`}
      target="_blank"
      className={styles["cateImpactful-main-item"]}
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
      <div className={styles["cateImpactful-main-item-thumnail"]}>
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

export const CateImpactful = async ({ catID, isEcoStories }: TProps) => {
  const resData = await getArticleByCatId(catID, isEcoStories);

  if (!resData || resData?.length <= 0) return <></>;

  return (
    <>
      <div className={styles["cateImpactful"]}>
        <div className={styles["cateImpactful-head"]}>
          <div className={"section-main-title !m-[unset] !mb-[2rem]"}>
            <h1>
              Impactful {isEcoStories ? "Eco-Stories" : resData[0]?.CatName}
            </h1>
          </div>
          <div className={styles["cateImpactful-head-right"]}>
            <ButtonMore
              path={`/search?&ResourceType=${
                ESearchResourceType.EcoStories
              }&Sort=${EMultipleResourcesSort.MostViewed}&CategoryId=${
                isEcoStories ? "" : catID
              }`}
            />
          </div>
        </div>

        <div className={styles["cateImpactful-main"]}>
          <div className={styles["cateImpactful-main-list"]}>
            {resData.map((data) => (
              <Item
                key={data._id}
                item={data}
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
