<template>
  <div class="dashboard">
    <h1 class="dashboard__title">首页</h1>
    <p class="dashboard__desc">这里演示按钮反馈、概览数据与 BaseChart 图表示例。</p>

    <div class="dashboard__actions">
      <el-button
        v-for="buttonItem in buttonList"
        :key="buttonItem.text"
        :type="buttonItem.type"
        @click="handleClick(buttonItem.messageType)"
      >
        {{ buttonItem.text }}
      </el-button>
    </div>

    <el-row :gutter="16" class="dashboard__metrics">
      <el-col
        v-for="metricItem in metricList"
        :key="metricItem.label"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <el-card shadow="hover" class="dashboard__metric-card">
          <div class="dashboard__metric-label">{{ metricItem.label }}</div>
          <div class="dashboard__metric-value">{{ metricItem.value }}</div>
          <div class="dashboard__metric-trend" :class="`is-${metricItem.trend}`">
            {{ metricItem.trendText }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="dashboard__chart-card" shadow="never">
      <template #header>
        <div class="dashboard__card-header">BaseChart 图表示例</div>
      </template>
      <div class="dashboard__chart-wrapper">
        <BaseChart :option="lineChartOption" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { MessageType } from "element-plus";
import type { EChartsOption } from "echarts";
import { ElMessage } from "element-plus";

// 按钮配置类型
interface DashboardButtonItem {
  type?: "primary" | "success" | "warning" | "danger" | "info";
  text: string;
  messageType: MessageType;
}

// 概览卡片类型
interface DashboardMetricItem {
  label: string;
  value: string;
  trend: "up" | "down";
  trendText: string;
}

// 按钮配置列表
const buttonList: DashboardButtonItem[] = [
  {
    text: "按钮",
    messageType: "info",
  },
  {
    type: "primary",
    text: "主要按钮",
    messageType: "primary",
  },
  {
    type: "success",
    text: "成功按钮",
    messageType: "success",
  },
  {
    type: "warning",
    text: "警告按钮",
    messageType: "warning",
  },
  {
    type: "danger",
    text: "危险按钮",
    messageType: "error",
  },
  {
    type: "info",
    text: "信息按钮",
    messageType: "info",
  },
];

// 概览卡片数据
const metricList: DashboardMetricItem[] = [
  {
    label: "今日访问量",
    value: "12,980",
    trend: "up",
    trendText: "较昨日 +8.6%",
  },
  {
    label: "新增用户",
    value: "368",
    trend: "up",
    trendText: "较昨日 +3.2%",
  },
  {
    label: "订单转化率",
    value: "14.2%",
    trend: "down",
    trendText: "较昨日 -1.1%",
  },
  {
    label: "支付成功率",
    value: "97.4%",
    trend: "up",
    trendText: "较昨日 +0.4%",
  },
];

// 折线图示例配置
const lineChartOption: EChartsOption = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["访问量"],
  },
  xAxis: {
    type: "category",
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "访问量",
      type: "line",
      smooth: true,
      data: [120, 200, 150, 80, 70, 110, 130],
      areaStyle: {
        opacity: 0.18,
      },
    },
  ],
};

// 按钮点击回调
const handleClick = (type: MessageType) => {
  ElMessage({
    type,
    message: "测试 Message",
  });
};
</script>

<style lang="less" scoped>
.dashboard {
  padding: 16px;

  &__title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: @color-text;
  }

  &__desc {
    margin: 8px 0 16px;
    color: @color-text-regular;
    line-height: 1.5;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
  }

  &__metrics {
    margin-bottom: 20px;
  }

  &__metric-card {
    margin-bottom: 16px;
    border-radius: 8px;
  }

  &__metric-label {
    color: @color-text-secondary;
    font-size: 13px;
  }

  &__metric-value {
    margin-top: 8px;
    font-size: 26px;
    color: @color-text;
    font-weight: 600;
  }

  &__metric-trend {
    margin-top: 10px;
    font-size: 13px;

    &.is-up {
      color: @color-success;
    }

    &.is-down {
      color: @color-danger;
    }
  }

  &__chart-card {
    border-radius: @border-radius;
  }

  &__card-header {
    font-size: 16px;
    font-weight: 600;
    color: @color-text;
  }

  &__chart-wrapper {
    height: 320px;
  }
}
</style>
