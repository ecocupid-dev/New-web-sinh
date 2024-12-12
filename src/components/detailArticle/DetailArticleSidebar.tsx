import { projectAPI, writerAPI } from "@/api";
import styles from "@/styles/detailArticle.module.scss";
import { Image } from "antd";
import { Para } from "./Para";

type TProps = {
  writerId: string | undefined;
  projectId: string | undefined;
};

async function getWriterInfo(writerId: string) {
  try {
    const res = await writerAPI.getByID(writerId);
    return res.Data as TWriter;
  } catch (error) {
    console.log("Error in getWriterInfo", error);
  }
}

async function getProjectInfo(projectId: string) {
  try {
    const res = await projectAPI.getByID(projectId);
    const _projectInfo = res.Data as {
      project: TProject;
      countArticle: number;
    };
    if (!_projectInfo?.project?.IsPublish) return null;
    return _projectInfo;
  } catch (error) {
    console.log("Error in getWriterInfo", error);
  }
}

export const DetailArticleSidebar = async ({ writerId, projectId }: TProps) => {
  if (!writerId || !projectId) return <></>;
  const writerInfo = await getWriterInfo(writerId);
  const projectInfo = await getProjectInfo(projectId);

  return (
    <div className="">
      <div className={styles["detail-user"]}>
        <div className={styles["detail-user-avatar"]}>
          <Image
            src={writerInfo?.Avatar}
            alt={`eco-${writerInfo?.UserName}-flags`}
            width={"100%"}
            height={"100%"}
            style={{ objectFit: "cover", borderRadius: "100%" }}
            preview={false}
          />
        </div>
        <div className={styles["detail-user-username"]}>
          {writerInfo?.UserName}
        </div>
        <div className={styles["detail-user-contact"]}>
          {writerInfo?.LinkedIn && (
            <div className="flex items-center">
              <Image
                src={"/icon/user-linkedIn.svg"}
                alt={`eco-${writerInfo?.UserName}-linkedIn`}
                preview={false}
                width={16}
                height={16}
              />
              <span className={styles["detail-user-contact-text"]}>
                {writerInfo?.LinkedIn}
              </span>
            </div>
          )}
          {writerInfo?.Email && (
            <div className="flex items-center">
              <Image
                src={"/icon/user-gmail.svg"}
                alt={`eco-${writerInfo?.UserName}-gmail`}
                preview={false}
                width={16}
                height={16}
              />
              <span className={styles["detail-user-contact-text"]}>
                {writerInfo?.Email}
              </span>
            </div>
          )}
        </div>
        <div className={styles["detail-user-des"]}>
          <Para des={writerInfo?.Description || ""} />
        </div>
      </div>
      {!!projectInfo && (
        <div className={styles["detail-project"]}>
          <div className={styles["detail-project-thumnail"]}>
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
          <div className={styles["detail-project-body"]}>
            <h3 className={styles["detail-project-subTitle"]}>
              {projectInfo?.countArticle} Articles & documentaries
            </h3>
            <h1 className={styles["detail-project-title"]}>
              {projectInfo?.project.Title}
            </h1>
            <div className={styles["detail-project-des"]}>
              <Para des={projectInfo?.project?.Description || ""} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
