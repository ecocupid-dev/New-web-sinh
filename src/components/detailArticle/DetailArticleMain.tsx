import { countryList } from "@/config";
import styles from "@/styles/detailArticle.module.scss";
import { Image, Breadcrumb } from "antd";
import { _format } from "../utils";
import { MyBreadCumb } from "../breadcumb";

type TProps = {
  data: TArticles | undefined;
};

export const DetailArticleMain = ({ data }: TProps) => {
  const countryTarget = countryList.find((item) => item.Id === data?.CountryId);

  return (
    <div>
      <MyBreadCumb 
        firstRoute={{name: "Home", path: "/"}}
        curRoute={{name: data?.Title || ''}}
      />
      <h1 className={styles["detail-title"]}>{data?.Title}</h1>
      <div className={styles["detail-info"]}>
        {countryTarget?.Id !== 0 && (
          <div className={styles["detail-country"]}>
            <div className={styles["detail-country-flag"]}>
              <Image
                src={countryTarget?.FlagImage}
                alt={`eco-${countryTarget?.Name}-flags`}
                width={"100%"}
                height={"100%"}
                style={{ objectFit: "cover", borderRadius: "100%" }}
                preview={false}
              />
            </div>
            <span className={styles["detail-country-name"]}>
              {countryTarget?.Name}
            </span>
          </div>
        )}
        {data?.Tags && (
          <div className={styles["detail-tags"]}>
            {data?.Tags?.map((tag) => (
              <span className={styles["detail-tags-tag"]} key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {data?.Created && (
          <div className={styles["detail-time"]}>{_format.getTimeSince(data?.Created)}</div>
        )}
      </div>

      {data?.Content && (
        <div
          className="tinymce-content"
          dangerouslySetInnerHTML={{ __html: data?.Content }}
        />
      )}
    </div>
  );
};
