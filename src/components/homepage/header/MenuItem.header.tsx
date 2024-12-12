"use client";

import clsx from "clsx";
import styles from "./index.module.scss";
import Link from "next/link";
import { Popover } from "antd";
import { Icon } from "@/components";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";


type TProps = {
  menu: TMenu
};

export const MenuItem = ({ menu }: TProps) => {
  const pathname = usePathname();
  const [activeArrow, setActiveArrow] = useState(false);

  const renderSubMenu = useCallback((subMenu: TMenuChildren[]) => {
    return (
      <div className={styles.subMenuList}>
        {subMenu?.map((sub) => (
          <Link
            key={sub.Id}
            href={sub.Path}
            target="_blank"
            className={styles.subMenuItem}
          >
            {sub.Name}
          </Link>
        ))}
      </div>
    );
  }, []);

  return (
    <div
      key={menu.Id}
      className={clsx(
        styles.subMenuPopover,
        pathname === menu.Path && styles.active
      )}
    >
      <Link href={menu.Path} target="_blank" className={styles.menuItem}>
        {menu.Name}
      </Link>
      {menu?.Childrens ? (
        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={renderSubMenu(menu.Childrens)}
          onOpenChange={(visible) => {
            setActiveArrow(visible);
          }}
          // arrow={false}
        >
          <Icon
            src="/icon/arrow-down.png"
            className={clsx(styles.arrow, activeArrow && styles.active)}
            size={{
              width: 30,
              height: 30,
            }}
          />
        </Popover>
      ) : (
        <></>
      )}
    </div>
  );
};
