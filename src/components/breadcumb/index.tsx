import React from "react";
import { Breadcrumb, Image } from "antd";

type TProps = {
  firstRoute: {
    name: string;
    path?: string;
  };
  curRoute: {
    name: string;
    path?: string;
  };
};

export const MyBreadCumb = ({ firstRoute, curRoute }: TProps) => {
  return (
    <div className="container !mb-6">
      <Breadcrumb
        className="flex items-center"
        separator={
          <Image src="/svg/breadcumb-icon.svg" alt="" preview={false} />
        }
        items={[
          {
            title: firstRoute.name,
            href: firstRoute.path,
          },
          {
            title: curRoute.name,
            href: curRoute.path || "",
            className: "!font-semibold !text-black",
          },
        ]}
      />
    </div>
  );
};
