"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type TProps = {
  data: THomeVideo[];
};

const Item = ({ item }: { item: THomeVideo }) => {
  // const countryTarget = countryList.find((x) => x.Id === item?.CountryId);

  return (
    <div className={styles["flim-impact-video"]}>
      <ReactPlayer
        url={item.LinkYoutube}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
        }}
        controls={true}
        width={"100%"}
        height={"100%"}
        // config={{
        //   youtube: {
        //     playerVars: {
        //       modestbranding: 1,
        //       rel: 0,
        //       showinfo: 0,
        //       controls: 0, // Ẩn điều khiển
        //     },
        //   },
        // }}
      />
    </div>
  );
};

export const FilmSwiper = ({ data }: TProps) => {
  const [video, setVideo] = useState(data[0]);

  const handleChangeVideo = (video: THomeVideo) => setVideo(video);

  return (
    <div className={styles["flim-impact"]}>
      <Item item={video} />
      <div className={styles["flim-impact-content"]}>
        <h1 className={styles["flim-impact-content-title"]}>{video?.Title}</h1>
        <ul className={styles["flim-impact-content-tags"]}>
          {video?.Tags.map((tag) => (
            <span className={styles["flim-impact-content-tag"]} key={tag}>
              {tag}
            </span>
          ))}
        </ul>
      </div>
      <div className={styles["flim-impact-controls"]}>
        {data?.map((item) => (
          <span
            className={clsx(
              styles["flim-impact-control"],
              item._id === video._id
                ? styles["flim-impact-control-active"]
                : styles["flim-impact-control-inactive"]
            )}
            onClick={() => {
              if (item._id === video._id) return;
              handleChangeVideo(item)
            }}
            key={item._id}
          />
        ))}
      </div>
    </div>
  );
};
