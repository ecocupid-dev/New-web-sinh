import { _format } from "../utils";
import styles from "./index.module.scss";

type TProps = {
  data: TVideo;
};

export const VideoMain = ({ data }: TProps) => {
  return (
    <div className={styles["video-screen-main"]}>
      <h1 className={styles["video-screen-main-title"]}>{data?.Title}</h1>
      <ul className={styles["video-screen-main-tags"]}>
        {data?.Tags?.map((tag) => (
          <li key={tag} className={styles["video-screen-main-tag"]}>
            {tag}
          </li>
        ))}
        <li className={styles["video-screen-main-date"]}>
          {_format.getTimeSince(data?.Created)}
        </li>
      </ul>
      <h3 className={styles["video-screen-main-h3"]}>Description</h3>
      <p className={styles["video-screen-main-para"]}>{data?.Summary}</p>
    </div>
  );
};
