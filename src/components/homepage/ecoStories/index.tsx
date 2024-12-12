import clsx from "clsx";
import { ButtonMore } from "..";
import styles from "./index.module.scss";
import { homeAPI } from "@/api";
import { StoriesSwiper } from "./StoriesSwiper";
import { EMultipleResourcesSort, ESearchResourceType } from "@/enum/home";

async function getHomeStoriesList() {
  try {
    const resCatList = await homeAPI.getCategoryList({ IsPublish: true });
    const catId = resCatList.Data?.find(
      (item) => item.Name === "Our Readers' Stories"
    );

    if (!catId) return;
    const resArticle = await homeAPI.getEcoArticleWithoutCatIDlist({
      CategoryId: catId?._id,
    });

    return resArticle.Data;
  } catch (error) {
    return [];
  }
}

export const EcoStories = async () => {
  const resArticle = await getHomeStoriesList();

  return (
    <div className={clsx(styles["eco-stories"])}>
      <div className={clsx(styles["eco-stories-wrap"], "container")}>
        <div className={"section-main-title"}>
          <h1>Newest Eco-Stories</h1>
          <p className={"section-main-des"}>
            Be inspired by the amazing people saving the environment today!
          </p>
        </div>

        <StoriesSwiper data={resArticle} />
        <ButtonMore
          path={`/search?&ResourceType=${ESearchResourceType.EcoStories}&Sort=${EMultipleResourcesSort.Newest}`}
        />
      </div>
    </div>
  );
};
