"use client";

import { TextButton } from "@/components/global";
import { RootState } from "@/store";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar as AvatarAntd, Button, Layout, Space } from "antd";
import clsx from "clsx";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./idnex.module.scss"

const { Header } = Layout;

type TProps = {
  collapsed: boolean;
  handleToggleMenu: () => void;
};

export const ManagerHeader = ({ collapsed, handleToggleMenu }: TProps) => {
  const router = useRouter()
  const { UserName, Avatar, _id } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    Cookies.remove('token');
    router.push("/login")
  };

  return (
    <Header
      className={clsx(
        styles["manager-header"],
        "flex items-center justify-between px-4"
      )}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={handleToggleMenu}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Space>
        <Button className={styles["manager-header-button"]}
          onClick={() => router.push(`/manager/users/${_id}`)}
        >
          <AvatarAntd icon={<UserOutlined />} src={Avatar} />
          <span className="font-bold ml-2 text-[#004737]">{UserName}</span>
        </Button>
        <TextButton
          text="Logout"
          onClick={handleLogout}
          classButton="!bg-[red] !text-white hover:scale-[0.94] hover:translate-y-1"
        />
      </Space>
    </Header>
  );
};
