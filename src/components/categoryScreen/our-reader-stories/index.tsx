import { homeAPI } from "@/api";
import styles from "./index.module.scss";
import { MyBreadCumb } from "@/components/breadcumb";
import { NotFound } from "@/components/global";
import clsx from "clsx";
import { ButtonMore } from "@/components/homepage";
import Link from "next/link";
import { countryList } from "@/config";
import { Image } from "antd";
import { _format } from "@/components/utils";

type TProps = {
  catID: string;
};

async function getArticleByCatId(id: string) {
  try {
    const res = await homeAPI.getEcoArticleByCatIDlist({
      CategoryId: id,
      IsNewest: true,
      Limit: 20,
    });
    return res.Data;
  } catch (error) {
    return [];
  }
}

const Item = ({ item }: { item: TListArticleByCatId }) => {
  const countryTarget = countryList.find(
    (country) => country.Id === item?.CountryId
  );

  return (
    <Link
      target="_blank"
      href={item.OgUrl}
      className={styles["reader-stories-inner-item"]}
    >
      {countryTarget?.FlagImage && (
        <div
          className={clsx(
            styles["reader-stories-inner-item-flag"],
            "left-[0.8rem]"
          )}
        >
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
      <div className={styles["reader-stories-inner-item-thumnail"]}>
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
      <div className={styles["reader-stories-inner-item-content"]}>
        <ul className={styles["reader-stories-inner-item-content-tags"]}>
          {item.Tags.map((tag) => (
            <li
              key={tag}
              className={styles["reader-stories-inner-item-content-tag"]}
            >
              {tag}
            </li>
          ))}
        </ul>
        <h1 className={styles["reader-stories-inner-item-content-title"]}>
          {item.Title}
        </h1>

        <div className={styles["reader-stories-inner-item-content-author"]}>
          <Image
            src={item?.Author.Avatar}
            alt={`${item?.Author.Avatar}-avatar`}
            className={
              styles["reader-stories-inner-item-content-author-avatar"]
            }
          />
          <div
            className={styles["reader-stories-inner-item-content-author-info"]}
          >
            <div
              className={
                styles["reader-stories-inner-item-content-author-name"]
              }
            >
              {item?.Author?.UserName}
            </div>
            <div
              className={
                styles["reader-stories-inner-item-content-author-created"]
              }
            >
              {_format.getTimeSince(item?.Created)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const OurReaderStoriesCate = async ({ catID }: TProps) => {
  const resData = await getArticleByCatId(catID);

  if (!resData || resData?.length <= 0)
    return <NotFound text="Page Not Found !" />;

  return (
    <div className={clsx(styles["reader-stories"], "container")}>
      <MyBreadCumb
        firstRoute={{
          name: "Home",
          path: "/",
        }}
        curRoute={{
          name: resData[0]?.CatName || "",
        }}
      />
      <div className={styles["reader-stories-inner"]}>
        <div className={styles["reader-stories-inner-head"]}>
          <div className={"section-main-title"}>
            <h1>Our Reader’s Stories</h1>
          </div>
          <ButtonMore
            path="/"
            text="tell us your eco-stories"
            showArrow={false}
          />
        </div>
        <div className={styles["reader-stories-inner-list"]}>
          {resData?.map((item) => (
            <Item key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
