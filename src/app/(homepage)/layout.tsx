import { HomeFooter, HomeHeader } from "@/components";
import { gereralSans, lator, mainRouter } from "@/config";
import styles from "@/styles/homePage.module.scss";
import clsx from "clsx";
import { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: mainRouter.home.title,
  description: mainRouter.home.description,
};

function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={clsx(lator.className, gereralSans.variable)}>
        <HomeHeader />
        <div className={styles["homePage-container"]}>{children}</div>
        <HomeFooter />
      </body>
    </html>
  );
}

export default HomeLayout;
