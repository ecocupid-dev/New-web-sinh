import { homeAPI } from "@/api";
import { FilmLatestSwiper } from "../film-latest/FlimLatestSwiper";
import styles from "../film-latest/index.module.scss";
import clsx from "clsx";

async function getHomeVideoList() {
  try {
    const res = await homeAPI.getVideoList({
      IsFeature: true,
      Limit: 20,
    });

    return res.Data;
  } catch (error) {
    return [];
  }
}

export const FilmFeature = async () => {

  const resData = await getHomeVideoList();

  if (!resData || resData.length <= 0) {
    return <></>;
  }

  return (
    <div className={clsx(styles["film-latest"], "my-[120px]")}>
      <div className={styles["film-latest-head"]}>
        <div className={"section-main-title !m-[unset] !mb-[2rem]"}>
          <h1>Featured Eco-Films</h1>
        </div>
      </div>
      <FilmLatestSwiper data={resData} />
    </div>
  )
}