import clsx from "clsx";
import { CateNewest } from "./CateNewest";
import styles from "./index.module.scss";
import { CateImpactful } from "./CateImpactFul";
import { CateFeature } from "./CateFeature";
import { OurReaderStoriesCate } from "./our-reader-stories";

type TProps = {
  category: THomeCategory;
};

export const CategoryScreenIndex = ({ category }: TProps) => {
  const isEcoStories = category.Code === "eco-stories";
  const isOurReaderStories = category.Code === "our-readers-stories";

  return (
    <>
      {isOurReaderStories ? (
        <OurReaderStoriesCate catID={category._id} />
      ) : (
        <div className={clsx(styles["cateScreen"], "container")}>
          <CateNewest catID={category._id} isEcoStories={isEcoStories} />
          <CateImpactful catID={category._id} isEcoStories={isEcoStories} />
          <CateFeature catID={category._id} isEcoStories={isEcoStories} />
        </div>
      )}
    </>
  );
};
