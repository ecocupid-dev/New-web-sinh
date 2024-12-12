import { projectAPI } from "@/api";
import styles from "./index.module.scss";
import { Image } from "antd";
import { Para } from "./Para";

async function getProjectInfo(projectId: string) {
  try {
    const res = await projectAPI.getByID(projectId);
    return res.Data as { project: TProject; countVideo: number };
  } catch (error) {
    console.log("Error in getWriterInfo", error);
  }
}

type TProps = {
  projectId: string;
};

export const VideoSidebar = async ({ projectId }: TProps) => {
  if (!projectId) return <></>;
  const projectInfo = await getProjectInfo(projectId);

  return (
    <div className={styles["video-screen-sidebar"]}>
      <div className={styles["video-screen-sidebar-thumnail"]}>
        <Image
          alt="eco-heroes-thumnail"
          src={projectInfo?.project.Image}
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className={styles["video-screen-sidebar-body"]}>
        <h3 className={styles["video-screen-sidebar-subTitle"]}>
          {projectInfo?.countVideo} Videos & documentaries
        </h3>
        <h1 className={styles["video-screen-sidebar-title"]}>
          {projectInfo?.project.Title}
        </h1>
        <div className={styles["video-screen-sidebar-des"]}>
          <Para des={projectInfo?.project?.Description || ""} />
        </div>
      </div>
    </div>
  );
};
