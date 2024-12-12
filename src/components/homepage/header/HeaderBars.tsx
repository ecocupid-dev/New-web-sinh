"use client";
import { Icon } from "@/components";
import { menuItemData } from "@/config";
import { Drawer } from "antd";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./index.module.scss";

const HeaderBars = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [childDrawer, setChildDrawer] = useState(false);

  const handleShowMenuMobile = () => setShowMenu(!showMenu);
  const handleShowChildDraw = () => setChildDrawer(!childDrawer);

  return (
    <div className={styles.menuBars}>
      <div
        className={clsx(
          styles["menuBars-wrapper"],
          styles["menuBars-openMenu"],
          styles["menuBars-svg"],
          showMenu && styles["active"]
        )}
        onClick={handleShowMenuMobile}
      >
        <svg className={styles["menuBars-svg-svg"]} viewBox="0 0 100 100">
          <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
          <path d={!showMenu ? "m 50,50 h 20" : "m 30,50 h 40"}></path>
          <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
        </svg>
      </div>

      <Drawer
        // onClick={handleShowMenuMobile}
        onClose={handleShowMenuMobile}
        open={showMenu}
        className={styles["menuBars-menu-drawer"]}
        width={"auto"}
        extra={
          <Link
            href={"/partner"}
            target="_blank"
            className={styles["menuBars-menu-partner"]}
          >
            Partner with EcoCupid
          </Link>
        }
      >
        <div className={styles["menuBars-menu-content"]}>
          {menuItemData?.map((menu) => (
            <div className={styles["menuBars-menu-item"]} key={menu.Id}>
              <div className="flex justify-between">
                <Link href={menu.Path} target="_blank">
                  {menu.Name}
                </Link>
                {menu?.Childrens && (
                  <Icon
                    src="/icon/arrow-down.png"
                    onClick={handleShowChildDraw}
                    className={styles["menuBars-menu-icon"]}
                  />
                )}
              </div>

              {menu?.Childrens ? (
                <Drawer
                  width={280}
                  closable={false}
                  onClose={handleShowChildDraw}
                  className={styles["menuBars-menu-drawer-child"]}
                  open={childDrawer}
                >
                  {menu.Childrens.map((child) => (
                    <Link
                      href={child.Path}
                      target="_blank"
                      key={child.Id}
                      className={styles["menuBars-menu-item-sub"]}
                    >
                      {child.Name}
                    </Link>
                  ))}
                </Drawer>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export const HeaderBarsMemo = React.memo(HeaderBars);
