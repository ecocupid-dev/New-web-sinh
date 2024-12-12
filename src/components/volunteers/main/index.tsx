import React from "react";
import styles from './index.module.scss'
import clsx from "clsx";
import { Main } from "./Main";
import { Sidebar } from "./Sidebar";

export const MainVolunteer = () => {

  return (
    <div className={clsx(styles["volunteer"], "container")}>
      <Main />
      <Sidebar />
    </div>
    
  )
}