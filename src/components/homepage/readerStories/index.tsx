import clsx from "clsx";
import { ButtonMore } from "..";
import styles from "./index.module.scss";
import { homeAPI } from "@/api";
import { ReaderSwiper } from "./ReaderSwiper";

async function getHomeReaderList() {
  try {
    const resCatList = await homeAPI.getCategoryList({ IsPublish: true });
    const catId = resCatList.Data?.find(item => item.Name === "Our Readers' Stories");

    if (!catId) return
    const resArticle = await homeAPI.getEcoArticleByCatIDlist({CategoryId: catId?._id})

    return resArticle.Data
  } catch (error) {
    return []
  }
}

export const ReaderStories = async () => {
  const resData = await getHomeReaderList()

  return (
    <div className={clsx(styles["eco-readerStories"])}>
      <div className={clsx(styles["eco-readerStories-inner"], "container")}>
        <div className={"section-main-title"}>
          <h1>Ours Readers’ stories</h1>
        </div>
        <p className={"section-main-des"}>See what our eco-community says</p>
        <ReaderSwiper data={resData}/>
        <ButtonMore path="/our-readers-stories" />
      </div>
    </div>
  );
};
