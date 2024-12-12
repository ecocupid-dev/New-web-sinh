"use client";

import styles from "./index.module.scss";
import CountUp from "react-countup";

type TProps = {
  totalProject: number;
};

export const EcoCountUp = (total: TProps) => {
  return (
    <CountUp
      start={0}
      end={total.totalProject || 0}
      duration={1.5}
      separator=","
      suffix=" +"
      enableScrollSpy
      className={styles["eco-maps-count"]}
    />
  );
};
