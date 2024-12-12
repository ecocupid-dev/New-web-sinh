import {
  Banner,
  EcoCategories,
  EcoFilmsSecion,
  EcoHeros,
  EcoMaps,
  EcoStories,
  IntroUs,
  ReaderStories,
} from "@/components";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "@/styles/heroes.css";
import "@/styles/readerStories.css";
import "@/styles/stories.css";


function HomePage() {
  return (
    <>
      <Banner />
      <EcoFilmsSecion />
      <EcoStories />
      {/* <EcoHeros /> */}
      <EcoMaps />
      <EcoCategories />
      <ReaderStories />
      <IntroUs />
    </>
  );
}

export default HomePage;
