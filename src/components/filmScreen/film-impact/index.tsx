import { homeAPI } from "@/api";
import { FilmSwiper } from "./FilmSwiper";
import { ButtonMore } from "@/components/homepage";
import { EMultipleResourcesSort, ESearchResourceType } from "@/enum/home";

async function getHomeVideoList() {
  try {
    const res = await homeAPI.getVideoList({
      IsMostView: true,
      Limit: 4,
    });

    return res.Data;
  } catch (error) {
    return [];
  }
}

export const FilmImpact = async () => {
  const resData = await getHomeVideoList();

  if (!resData || resData.length <= 0) {
    return <></>;
  }

  return (
    <div className="mb-[120px]">
      <div className={"section-main-title"}>
        <h1>Impactful Eco-Films</h1>
      </div>
      <FilmSwiper data={resData} />
      <ButtonMore
        path={`/search?&ResourceType=${ESearchResourceType.EcoFilms}&Sort=${EMultipleResourcesSort.MostViewed}`}
        classContainer="!mt-8"
      />
    </div>
  );
};
