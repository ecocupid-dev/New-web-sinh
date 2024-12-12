import { Pagination } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import clsx from "clsx";
import styles from "./index.module.scss";

type TMyPaginationProps = PaginationProps;

const MyPagination = (props: TMyPaginationProps) => {
  const { className, ...restProps } = props;
  return (
    <Pagination className={clsx(styles.wrapper, className)} {...restProps} />
  );
};

export default MyPagination;
