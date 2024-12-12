import { Button, Modal } from "antd";
import React from "react";
import styles from "./index.module.scss";

type TProps = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  title: React.ReactNode;
  children: React.ReactNode | React.ReactElement;
  loading?: boolean;
  size?: {
    minWidth?: string;
    maxWidth?: string;
  };
};

export const ModalForm = ({
  open,
  onOk,
  onCancel,
  title,
  children,
  loading = false,
  size = {
    minWidth: "40vw",
    maxWidth: "80vw",
  },
}: TProps) => {
  return (
    <Modal
      className={styles["modal-form"]}
      open={open}
      onCancel={onCancel}
      footer={null}
      style={size}
    >
      <div className={styles["modal-form-content"]}>
        <div className={styles["modal-form-title"]}>{title}</div>
        <div className={styles["modal-form-body"]}>{children}</div>
        <div className={styles["modal-form-footer"]}>
          <Button
            className="font-semibold"
            danger
            type="primary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            onClick={onOk}
            className="bg-[#56F09F] font-semibold"
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
