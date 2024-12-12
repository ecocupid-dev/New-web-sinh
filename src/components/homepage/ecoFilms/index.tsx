import styles from "./index.module.scss";
import { ButtonMore } from "..";
import { SwiperComponent } from "./SwiperItem";
import { homeAPI } from "@/api";

async function getHomeVideoList() {
  try {
    const resData = await homeAPI.getVideoList();
    return resData.Data;
  } catch (error) {
    console.error("[Error] - Fetching getHomeVideoList!");
    return [];
  }
}

export const EcoFilmsSecion = async () => {
  const videoDataList = await getHomeVideoList();

  console.log(videoDataList);

  if (!videoDataList) return;

  return (
    <div className={styles["eco-film"]}>
      <div className={"section-main-title"}>
        <h1>Our Eco-Films</h1>
      </div>
      {videoDataList.length >= 10 ? (
        <>
          <SwiperComponent
            data={videoDataList.slice(0, videoDataList.length / 2)}
            dir="ltr"
            centeredSlides={false}
            delay={2000}
          />
          <SwiperComponent
            data={videoDataList.slice(
              videoDataList.length / 2,
              videoDataList.length - 1
            )}
            dir="rtl"
            centeredSlides={true}
            delay={2000}
          />
        </>
      ) : (
        <SwiperComponent
          data={videoDataList}
          dir="ltr"
          centeredSlides={false}
          delay={2000}
        />
      )}
      <ButtonMore path="/eco-films" />
    </div>
  );
};
