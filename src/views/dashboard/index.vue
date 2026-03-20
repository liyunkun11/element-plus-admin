<template>
  <div class="dashboard">
    <h1>首页</h1>
    <el-button>按钮</el-button>
    <el-button type="primary" @click="handleClick('primary')">
      主要按钮
    </el-button>
    <el-button type="success" @click="handleClick('success')">
      成功按钮
    </el-button>
    <el-button type="warning" @click="handleClick('warning')">
      警告按钮
    </el-button>
    <el-button type="danger" @click="handleClick('error')">
      危险按钮
    </el-button>
    <el-button type="info" @click="handleClick('info')">
      信息按钮
    </el-button>
  </div>
</template>

<script setup lang="ts">
import type { MessageType } from "element-plus";
import { ElMessage } from "element-plus";

// 点击回调
const handleClick = (type: MessageType) => {
  console.log(type);
  ElMessage({
    type,
    message: "测试Message",
  });
};
</script>

<style lang="less" scoped>
</style>
