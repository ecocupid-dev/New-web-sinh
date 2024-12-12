import { homeAPI } from "@/api";
import { NotFound } from "../global";
import { ButtonMore } from "../homepage";
import styles from "./index.module.scss";
import { Image } from "antd";
import { countryList } from "@/config";
import { _format } from "../utils";
import clsx from "clsx";
import { MyBreadCumb } from "../breadcumb";
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
        IsNewest: true,
        Limit: 5,
      });
    } else {
      res = await homeAPI.getEcoArticleByCatIDlist({
        CategoryId: id,
        IsNewest: true,
        Limit: 5,
      });
    }
    return res.Data;
  } catch (error) {
    return [];
  }
}

const ItemOfMain = ({ item }: { item: TListArticleByCatId }) => {
  const countryTarget = countryList.find(
    (country) => country.Id === item?.CountryId
  );

  return (
    <Link
      href={`${item.OgUrl}`}
      target="_blank"
      className={styles["cateNewest-itemOfMain"]}
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
      <div className={styles["cateNewest-itemOfMain-thumnail"]}>
        <Image
          alt={item.Thumnail}
          src={item.Thumnail}
          height={"100%"}
          width={"100%"}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className={styles["cateNewest-itemOfMain-content"]}>
        <ul className={styles["cateNewest-itemOfMain-content-tags"]}>
          {item.Tags.map((tag) => (
            <li
              key={tag}
              className={styles["cateNewest-itemOfMain-content-tag"]}
            >
              {tag}
            </li>
          ))}
        </ul>
        <h1 className={styles["cateNewest-itemOfMain-content-title"]}>
          {item.Title}
        </h1>
        <div className={styles["cateNewest-itemOfMain-content-author"]}>
          <Image
            src={item?.Author.Avatar}
            alt={`${item?.Author.Avatar}-avatar`}
            className={styles["cateNewest-itemOfMain-content-author-avatar"]}
          />
          <div className={styles["cateNewest-itemOfMain-content-author-info"]}>
            <div
              className={styles["cateNewest-itemOfMain-content-author-name"]}
            >
              {item?.Author?.UserName}
            </div>
            <div
              className={styles["cateNewest-itemOfMain-content-author-created"]}
            >
              {_format.getDate(item?.Created)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ItemOfList = ({ item }: { item: TListArticleByCatId }) => {
  const countryTarget = countryList.find(
    (country) => country.Id === item?.CountryId
  );

  return (
    <Link
      href={`${item.OgUrl}`}
      target="_blank"
      className={styles["cateNewest-itemOfList"]}
    >
      {countryTarget?.FlagImage && (
        <div className={clsx(styles["cateNewest-flag"], "right-[0.8rem]")}>
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
      <div className={styles["cateNewest-itemOfList-content"]}>
        <div className={styles["cateNewest-itemOfList-main"]}>
          <ul className={styles["cateNewest-itemOfList-main-tags"]}>
            {item.Tags.map((tag) => (
              <li
                key={tag}
                className={styles["cateNewest-itemOfList-main-tag"]}
              >
                {tag}
              </li>
            ))}
          </ul>
          <h1 className={styles["cateNewest-itemOfList-main-title"]}>
            {item.Title}
          </h1>
        </div>
        <div className={styles["cateNewest-itemOfList-thumnail"]}>
          <Image
            alt={item.Thumnail}
            src={item.Thumnail}
            height={"100%"}
            width={"100%"}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export const CateNewest = async ({ catID, isEcoStories }: TProps) => {
  const resData = await getArticleByCatId(catID, isEcoStories);

  if (!resData || resData?.length <= 0)
    return <NotFound text="Page Not Found !" />;

  console.log("isEcoStories: ", isEcoStories);

  return (
    <>
      <MyBreadCumb
        firstRoute={{ name: "Home", path: "/" }}
        curRoute={{ name: isEcoStories ? "Eco-Stories" : resData[0]?.CatName }}
      />

      <div className={styles["cateNewest"]}>
        <div className={styles["cateNewest-head"]}>
          <div className={"section-main-title !m-[unset] !mb-[2rem]"}>
            <h1>Newest {isEcoStories ? "Eco-Stories" : resData[0]?.CatName}</h1>
          </div>
          <div className={styles["cateNewest-head-right"]}>
            <ButtonMore
              path={`/search?&ResourceType=${
                ESearchResourceType.EcoStories
              }&Sort=${EMultipleResourcesSort.Newest}&CategoryId=${
                isEcoStories ? "" : catID
              }`}
            />
          </div>
        </div>

        <div className={styles["cateNewest-main"]}>
          <div className={styles["cateNewest-main-content"]}>
            <ItemOfMain item={resData[0]} />
          </div>
          <div className={styles["cateNewest-main-list"]}>
            {resData.slice(1, resData.length).map((data) => (
              <ItemOfList key={data._id} item={data} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
