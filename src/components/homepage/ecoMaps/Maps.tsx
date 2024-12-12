import { homeAPI } from "@/api";
import { Image } from "antd";
import clsx from "clsx";
import { EcoCountUp } from "./CountUp";
import styles from "./index.module.scss";
import { EcoFlags } from "./EcoFlags";

async function getHomeProjectList() {
  try {
    const resHeroes = await homeAPI.getEcoProjectlist();
    return resHeroes.Data as THomeProject;
  } catch (error) {
    console.error("[Error] - Fetching getHomeProjectList!");
    return {
      projects: {},
      totalProject: 0,
    };
  }
}

export const Maps = async () => {
  const dataProject = await getHomeProjectList();

  return (
    <div className={styles["eco-maps"]}>
      <div className={clsx(styles["eco-maps-inner"], "container")}>
        <div className={styles["eco-maps-content"]}>
          <div
            className={clsx(
              "section-main-title section-main-title-without",
              styles["eco-maps-content-title"]
            )}
          >
            <h1 className={styles["eco-maps-title"]}>
              Discover Eco-Projects <br /> in Southeast Asia
            </h1>
          </div>
          <EcoCountUp totalProject={dataProject.totalProject} />
          <p className={clsx("section-main-des", styles["eco-maps-des"])}>
            Projects that EcoCupid featured
          </p>
        </div>
        <div className={styles["eco-maps-map"]}>
          <EcoFlags projects={dataProject.projects} />
          <div className={styles["eco-maps-map-svg"]}>
            <Image
              src="/image/southeastAsia-map.svg"
              alt="eco-sountheast-asia-map"
              width={"100%"}
              height={"100%"}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              preview={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
