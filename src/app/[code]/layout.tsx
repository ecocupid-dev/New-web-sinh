import { HomeFooter, HomeHeader } from "@/components";
import { gereralSans, lator } from "@/config";
import styles from "@/styles/homePage.module.scss";
import clsx from "clsx";
import "../(homepage)/globals.css";


function DetailArticleLayout ({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body className={clsx(lator.className, gereralSans.variable)}>
        <HomeHeader />
        <div className={styles["homePage-container"]}>{children}</div>
        <HomeFooter />
      </body>
    </html>
  )
}

export default DetailArticleLayout