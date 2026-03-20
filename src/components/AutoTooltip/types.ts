import type { UseTooltipProps } from "element-plus";

// 入参类型
export interface AutoTooltipProps {
  title: string | number
  auto?: boolean
  tooltipConfig?: UseTooltipProps
}
