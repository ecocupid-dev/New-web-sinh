import { MyBreadCumb } from "../breadcumb";
import styles from "./index.module.scss";
import { Video } from "./Video";
import { VideoMain } from "./VideoMain";
import { VideoSidebar } from "./VideoSidebar";

type TProps = {
  data: TVideo;
};

export const VideoScreenIndex = ({ data }: TProps) => {
  return (
    <div className="container">
      <MyBreadCumb
        firstRoute={{
          name: "Home",
          path: "/",
        }}
        curRoute={{
          name: data?.Title || "",
        }}
      />
      <div className={styles["video-screen"]}>
        <div className={styles["video-screen-video"]}>
          <Video LinkYoutube={data.LinkYoutube} />
        </div>
        <div className={styles["video-screen-content"]}>
          <VideoMain data={data} />
          <VideoSidebar projectId={data.ProjectId}/>
        </div>
      </div>
    </div>
  );
};
