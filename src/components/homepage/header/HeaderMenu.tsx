import { Icon } from "@/components";
import { followData, menuItemData } from "@/config";
import { Popover } from "antd";
import Link from "next/link";
import { HeaderBarsMemo } from "./HeaderBars";
import { MenuItem } from "./MenuItem.header";
import styles from "./index.module.scss";
import { homeAPI } from "@/api";

async function getHomeCategoryList() {
  try {
    const res = await homeAPI.getCategoryList({ IsPublish: true });
    return res.Data;
  } catch (error) {}
}

export const HeaderMenu = async () => {
  const resCats = await getHomeCategoryList();

  if (!resCats) return <></>;

  const handleRenderMenu = () => {
    let renderMenu: TMenu[] = [];

    menuItemData.forEach((item) => {
      if (item.Name !== "Eco-Stories") {
        renderMenu.push(item);
      } else {
        const newItem = {
          ...item,
          Childrens: resCats.map((cat) => ({
            Id: cat._id,
            Name: cat.Name,
            Path: cat.Code,
          })),
        }

        renderMenu.push(newItem as TMenu);
      }
    });
    return renderMenu;
  };

  const renderFollowUs = () => {
    return (
      <div className={styles["headerContact-follow-list"]}>
        {followData.map((item) => (
          <Link
            href={item.Path}
            target="_blank"
            key={item.Id}
            className={styles["headerContact-follow-item"]}
          >
            <Icon src={item.Icon} size={{ width: 40, height: 40 }} />
            <span style={{ color: item.Color }}>{item.Name}</span>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.menuWrapper}>
      {handleRenderMenu()?.map((menu) => (
        <MenuItem menu={menu} key={menu.Id} />
      ))}
      <div className={styles.headerContact}>
        <Link
          href={"/partner"}
          target="_blank"
          className={styles["headerContact-partner"]}
        >
          Partner with EcoCupid
        </Link>
        <Popover
          placement="bottomRight"
          content={renderFollowUs()}
          className={styles["headerContact-follow"]}
        >
          <Icon src="/icon/follow.png" size={{ width: 24, height: 24 }} />
          Follow Us
        </Popover>
      </div>
      <HeaderBarsMemo />
    </div>
  );
};
