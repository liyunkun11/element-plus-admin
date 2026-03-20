<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useThemeStore } from "@/store/theme";

dayjs.locale("zh-cn");
const themeStore = useThemeStore();
themeStore.setThemeMode(themeStore.themeMode);
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  color: @color-text;
  font-size: @font-size;
  font-family: @font-family;
}

#nprogress .bar {
  background-color: @color-primary !important;
}
</style>
