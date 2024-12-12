import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HeaderMenu } from "./HeaderMenu";
import styles from "./index.module.scss";

export const HomeHeader = () => {
  return (
    <div className={styles.header}>
      <div className={clsx("container", styles.innerHeader)}>
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt={"logo"}
            width={50}
            height={50}
            priority
          />
        </Link>
        <div className={styles.headerRight}>
          <HeaderMenu />
        </div>
      </div>
    </div>
  );
};
