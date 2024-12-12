import styles from "./index.module.scss";
// Import Swiper styles
import { homeAPI } from "@/api";
import clsx from "clsx";
import { ButtonMore } from "..";



export const EcoHeros = async () => {

  // const data = await getHomeHeroesList()
  return (
    <div className={clsx(styles["eco-heroes"], "container")}>
      <div className={"section-main-title"}>
        <h1>Eco-Heroes</h1>
      </div>
      <p className={"section-main-des"}>
        Be inspired by the amazing people saving the environment today!
      </p>
      <div className={styles["eco-heroes-sl"]}>
      {/* EcoHerosSwiper */}
        {/* <Swiper
          effect={"coverflow"}
          slidesPerView={1}
          speed={1200}
          spaceBetween={20}
          loop={true}
          watchSlidesProgress={true}
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 40,
            // stretch: 0,
            depth: 140,
            modifier: 1,
          }}
          breakpoints={{
            "768": {
              slidesPerView: 2,
            },
            "1024": {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className={clsx(
            styles["eco-heroes-sl-swiper"],
            "eco-heroes-sl-swiper"
          )}
        >
          {fakeData.map((item) => (
            <SwiperSlide key={item.Id}>
              <SlideItem
                Id={item.Id}
                Name={item.Name}
                Description={item.Description}
                Image={item.Image}
              />
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>

      <ButtonMore path="/"/>
    </div>
  );
};
