
import { Heroes } from "./Heroes";
import styles from "./index.module.scss";
import { Maps } from "./Maps";

export const EcoMaps = () => {
  return (
    <div className={styles["eco-section"]}>
      <Heroes />
      <Maps />
    </div>
  );
};
