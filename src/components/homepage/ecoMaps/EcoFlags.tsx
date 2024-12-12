"use client";
import { ECountry, initialFlags } from "@/config";
import { Badge, Image, Popover } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ButtonMore } from "../buttonMore";
import styles from "./index.module.scss";

type TProps = {
  projects: {
    [countryId: number]: TProjectObject[];
  };
};

type TPopContent = {
  Id: ECountry;
  Name: string;
  Count: number;
  Popover: {
    Id: number;
    Image: string;
  }[];
  Path: string;
};

const PopContent = ({ Id, Name, Count, Popover, Path }: TPopContent) => {
  return (
    <div className={styles["eco-maps-map-flags-popover"]}>
      <h3 className={styles["eco-maps-map-flags-popover-nameCountry"]}>
        {Name}
      </h3>
      <div className={styles["eco-maps-map-flags-popover-count"]}>
        {Count} Project(s)
      </div>
      <div className={styles["eco-maps-map-flags-popover-images"]}>
        {Popover.map((pover) => (
          <div
            key={pover.Id}
            className={styles["eco-maps-map-flags-popover-images-image"]}
          >
            <Image
              src={pover.Image}
              alt="eco-project-image"
              width={"100%"}
              height={"100%"}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ))}
      </div>
      <ButtonMore path={`/search?CountryId=${Id}`} classContainer="!mt-2" />
    </div>
  );
};

type TConverProject = {
  Id: ECountry;
  Name: string;
  Count: number;
  Popover:
    | {
        Id: number;
        Image: string;
        Title: string;
      }[]
    | [];
  Image: string;
  Alt: string;
  Path: string;
};

export const EcoFlags = ({ projects }: TProps) => {
  const [dataRender, setDataRender] = useState<TConverProject[]>(initialFlags);

  useEffect(() => {
    if (!projects) return;

    const newDataRender = initialFlags.map((flag) => {
      const projectData = projects[flag.Id] || [];
      return {
        ...flag,
        Count: projectData.length,
        Popover: projectData.map((item) => ({
          Id: item._id,
          Title: item.Title,
          Image: item.Image,
        })),
      };
    });

    setDataRender(newDataRender as TConverProject[]);
  }, [projects]);

  return (
    <div className={styles["eco-maps-map-flags"]}>
      {dataRender?.map((item) => (
        <div
          key={item.Id}
          className={clsx(
            styles["eco-maps-map-flags-flag"],
            styles[`eco-maps-map-flags-flag-${item.Name}`]
          )}
        >
          <Popover
            placement="rightTop"
            trigger={"click"}
            content={
              <PopContent
                Id={item.Id}
                Name={item.Name}
                Count={item.Count}
                Popover={item.Popover}
                Path={item.Path}
              />
            }
          >
            <Badge count={item.Count || 0}>
              <div className={styles["eco-maps-map-flags-flag-image"]}>
                <Image
                  src={item.Image}
                  alt={item.Alt}
                  preview={false}
                  width={"100%"}
                  height={"100%"}
                  style={{
                    objectFit: "cover",
                    borderRadius: "999px",
                  }}
                />
              </div>
            </Badge>
          </Popover>
        </div>
      ))}
    </div>
  );
};
