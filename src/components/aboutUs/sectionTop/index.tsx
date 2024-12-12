import clsx from "clsx";
import styles from "./index.module.scss";
import { Image } from "antd";

export const SectionTop = () => {
  return (
    <div className={styles["section-top"]}>
      <div className={clsx("container", styles["section-top-inner"])}>
        <div className={styles["section-top-left"]}>
          <div className="section-main-title">
            <h1>What do we see?</h1>
          </div>
          <div className={styles["section-top-left-image"]}>
            <Image
              src="/image/aboutus/section-01.svg"
              alt="svg"
              preview={false}
              width={'100%'}
            />
          </div>
        </div>

        <div className={styles["section-top-right"]}>
          <div className={styles["section-top-right-box"]}>
            <p className={styles["section-top-right-para"]}>
              Many eco-projects in <b> Southeast Asia</b> can change the world
              but they’re not always good at telling the world about it.
            </p>
          </div>
          <div className={styles["section-top-right-box"]}>
            <p className={styles["section-top-right-para"]}>
              Environmentalists may be saving the planet, but they’re not always
              good at selling themselves.
            </p>
          </div>
          <div className={styles["section-top-right-box"]}>
            <p className={styles["section-top-right-para"]}>
              Without the right guidance, eco-projects from
              <b> Southeast Asia</b> risk losing their context, ambitions, and
              impact when translated to a wider and more generalized
              English-speaking audience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
