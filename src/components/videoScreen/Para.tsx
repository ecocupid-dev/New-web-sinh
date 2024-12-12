"use client";
import { Typography } from "antd";
const { Paragraph } = Typography;

type TProps = {
  des: string | undefined;
};

export const Para = ({ des }: TProps) => {
  return (
    <Paragraph
      ellipsis={{
        rows: 4,
        expandable: true,
        symbol: "Show more",
      }}
    >
      {des}
    </Paragraph>
  );
};
