import type { VxeGridProps } from "vxe-table";

export interface GTableProps extends Pick<VxeGridProps, | "loading"
  | "height"
  | "columns"
  | "data"
  | "columnConfig"
  | "rowConfig"
  | "sortConfig"
  | "filterConfig"
  | "checkboxConfig"
  | "minHeight"
  | "stripe"
  | "border"
  | "round"
  | "showOverflow"
  | "showHeaderOverflow"> {
  fillParentHeight?: boolean // 是否填充父容器高度
}
