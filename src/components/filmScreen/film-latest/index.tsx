import { homeAPI } from "@/api";
import { FilmLatestSwiper } from "./FlimLatestSwiper";
import styles from "./index.module.scss";
import { ButtonMore } from "@/components/homepage";
import { EMultipleResourcesSort, ESearchResourceType } from "@/enum/home";

async function getHomeVideoList() {
  try {
    const res = await homeAPI.getVideoList({
      IsNewest: true,
      Limit: 20,
    });

    return res.Data;
  } catch (error) {
    return [];
  }
}

export const FilmLatest = async () => {
  const resData = await getHomeVideoList();

  if (!resData || resData.length <= 0) {
    return <></>;
  }
  return (
    <div className={styles["film-latest"]}>
      <div className={styles["film-latest-head"]}>
        <div className={"section-main-title !m-[unset] !mb-[2rem]"}>
          <h1>Latest Eco-Films</h1>
        </div>
      </div>
      <FilmLatestSwiper data={resData} />
      <ButtonMore
        path={`/search?&ResourceType=${ESearchResourceType.EcoFilms}&Sort=${EMultipleResourcesSort.Newest}`}
        classContainer="!mt-4"
      />
    </div>
  );
};
