import { articleAPI } from "@/api";
import {
  DetailArticleMain,
  DetailArticleSidebar,
  NotFound,
} from "@/components";
import styles from "@/styles/detailArticle.module.scss";
import clsx from "clsx";

async function getArticleDetail(code: string, isForSEO: boolean) {
  try {
    const res = await articleAPI.getByCode({ code, isForSEO });
    return res.Data;
  } catch (error) {
    console.log("Error in DetailArticle", error);
  }
}

type TProps = {
  code: string;
};

export async function DetailArticle({ code }: TProps) {
  if (!code) return;

  const data = await getArticleDetail(code, false);

  if (!data?._id) return <NotFound text="Article Not Found !" />;

  return (
    <div className={clsx(styles["detail-container"], "container")}>
      <div className={styles["detail-content"]}>
        <div className={styles["detail-content-main"]}>
          <DetailArticleMain data={data} />
        </div>
        <div className={styles["detail-content-sidebar"]}>
          <DetailArticleSidebar
            writerId={data?.WriterId}
            projectId={data?.ProjectId}
          />
        </div>
      </div>

      <div className={styles["detail-related"]}></div>
    </div>
  );
}
