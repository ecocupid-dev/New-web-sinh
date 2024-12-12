"use client";
import { ConfigProvider, Segmented } from "antd";
import styles from "./index.module.scss";
import "@/styles/categories.css";
import clsx from "clsx";

const SegmentedItem = ({ Name, _id }: THomeCategory) => {
  return (
    <div className={styles["eco-categories-segmented-item"]} key={_id}>
      {Name}
    </div>
  );
};

type TProps = {
  data: THomeCategory[] | undefined;
  handleOnChangeCat: (catId: string) => void
  selectedCat: string;
};

export const CategoriesSegmented = ({ data, handleOnChangeCat,selectedCat }: TProps) => {
  if (!data) return;

  return (
    <div
      className={clsx(
        styles["eco-categories-segmented"],
        "eco-categories-segmented"
      )}
    >
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              trackBg: "#D3FFE7",
              trackPadding: 4,
              itemSelectedBg: "#004737",
              itemSelectedColor: "white",
            },
          },
        }}
      >
        <Segmented
          options={data?.map((item) => ({
            label: <SegmentedItem Name={item.Name} _id={item._id}/>,
            value: item._id,
          }))}
          block
          size="large"
          defaultValue={selectedCat}
          onChange={(value) => {
            handleOnChangeCat(value);
          }}
        />
      </ConfigProvider>
    </div>
  );
};
