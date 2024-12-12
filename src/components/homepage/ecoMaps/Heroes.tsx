import clsx from "clsx";
import styles from "./index.module.scss";
import { ButtonMore } from "../buttonMore";
import { homeAPI } from "@/api";
import { Image } from "antd";
import Link from "next/link";

async function getHomeHeroesList() {
  try {
    const resHeroes = await homeAPI.getEcoHeroesList();
    return resHeroes.Data;
  } catch (error) {
    console.error("[Error] - Fetching getHomeHeroesList!");
    return [];
  }
}

const HeroesItem = ({ item }: { item: THomeHeroes }) => {
  return (
    <Link
      href={`/search?Search=${item.Title}`}
      target="_blank"
      className={styles["eco-heroes-item"]}
    >
      <div className={styles["eco-heroes-item-thumnail"]}>
        <Image
          alt="eco-heroes-thumnail"
          src={item.Image}
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "contain",
          }}
          preview={false}
        />
      </div>
      <div className={styles["eco-heroes-item-body"]}>
        <h3 className={styles["eco-heroes-item-subTitle"]}>
          {item.articleCount} Articles & documentaries
        </h3>
        <h1 className={styles["eco-heroes-item-title"]}>{item.Title} dfsf</h1>
      </div>
    </Link>
  );
};

export const Heroes = async () => {
  const data = await getHomeHeroesList();

  return (
    <div className={clsx("container", styles["eco-heroes"])}>
      <div className={styles["eco-heroes-head"]}>
        <div className={styles["eco-heroes-head-left"]}>
          <div className={"section-main-title"}>
            <h1>Eco-Heroes</h1>
          </div>
          <p className={"section-main-des"}>
            Be inspired by the amazing people saving the environment today!
          </p>
        </div>
        <div className={styles["eco-heroes-head-right"]}>
          <ButtonMore path="/" />
        </div>
      </div>
      <div className="w-full overflow-x-auto pb-2">
        <div className={styles["eco-heroes-list"]}>
          {data?.map((item) => (
            <HeroesItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
