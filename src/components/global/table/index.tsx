import { TColumnsType } from "@/types/table";
import { Table, TablePaginationConfig } from "antd";

type TProps<T extends object> = {
  rowKey?: keyof T | "Id";
  title?: string;
  columns: TColumnsType<T>;
  data: T[];
  pagination?: TablePaginationConfig;
  loading?: boolean;
  scroll?: {
    x?: string | number | true | undefined;
    y?: string | number | undefined;
  };
};

export const DataTable = <T extends object = object>({
  rowKey,
  columns,
  data,
  pagination,
  loading,
  scroll = { x: 1400 },
}: TProps<T>) => {
  return (
    <Table
      rowKey={rowKey as string}
      columns={columns}
      dataSource={data ?? []}
      pagination={pagination}
      loading={loading}
      scroll={scroll}
    />
  );
};
