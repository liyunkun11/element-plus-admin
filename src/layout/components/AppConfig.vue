<template>
  <el-drawer v-model="visible" title="主题设置" size="350px">
    <el-form :colon="false" label-width="80px">
      <el-form-item label="暗色主题">
        <el-switch v-model="themeMode" />
      </el-form-item>
      <el-form-item label="主题色">
        <el-row :gutter="8">
          <el-col :span="12">
            <el-color-picker v-model="primaryColor" :clearable="false" />
          </el-col>
          <el-col :span="12">
            <el-button @click="handleRestoreDefault('primary')">
              恢复默认
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="成功色">
        <el-row :gutter="8">
          <el-col :span="12">
            <el-color-picker v-model="successColor" :clearable="false" />
          </el-col>
          <el-col :span="12">
            <el-button @click="handleRestoreDefault('success')">
              恢复默认
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="警告色">
        <el-row :gutter="8">
          <el-col :span="12">
            <el-color-picker v-model="warningColor" :clearable="false" />
          </el-col>
          <el-col :span="12">
            <el-button @click="handleRestoreDefault('warning')">
              恢复默认
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="信息色">
        <el-row :gutter="8">
          <el-col :span="12">
            <el-color-picker v-model="infoColor" :clearable="false" />
          </el-col>
          <el-col :span="12">
            <el-button @click="handleRestoreDefault('info')">
              恢复默认
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="失败色">
        <el-row :gutter="8">
          <el-col :span="12">
            <el-color-picker v-model="errorColor" :clearable="false" />
          </el-col>
          <el-col :span="12">
            <el-button @click="handleRestoreDefault('danger')">
              恢复默认
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="清空缓存">
        <el-button type="primary" @click="handleClearCache">
          清空缓存并刷新
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
  <div class="settings-icon" @click="visible = true">
    <svg-icon name="simple/settings-outlined" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { ColorType } from "@/store/theme";
import { useThemeStore } from "@/store/theme";
import { getCssVar } from "@/utils/cssvar";

const themeStore = useThemeStore();

const visible = ref(false);

const themeMode = computed({
  get() {
    return themeStore.themeMode === "dark";
  },
  set(value) {
    themeStore.setThemeMode(value ? "dark" : "light");
  },
});

const primaryColor = computed({
  get() {
    return themeStore.primaryColor ? themeStore.primaryColor : getCssVar("--el-color-primary");
  },
  set(value) {
    themeStore.setThemeColor("primary", value);
  },
});
const successColor = computed({
  get() {
    return themeStore.successColor ? themeStore.successColor : getCssVar("--el-color-success");
  },
  set(value) {
    themeStore.setThemeColor("success", value);
  },
});
const warningColor = computed({
  get() {
    return themeStore.warningColor ? themeStore.warningColor : getCssVar("--el-color-warning");
  },
  set(value) {
    themeStore.setThemeColor("warning", value);
  },
});
const infoColor = computed({
  get() {
    return themeStore.infoColor ? themeStore.infoColor : getCssVar("--el-color-info");
  },
  set(value) {
    themeStore.setThemeColor("info", value);
  },
});
const errorColor = computed({
  get() {
    return themeStore.dangerColor ? themeStore.dangerColor : getCssVar("--el-color-danger");
  },
  set(value) {
    themeStore.setThemeColor("danger", value);
  },
});

const handleRestoreDefault = (type: ColorType) => {
  themeStore.restoreThemeColor(type);
};

const handleClearCache = () => {
  themeStore.clearThemeCache();
  window.location.reload();
};
</script>

<style lang="less" scoped>
.settings-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 20px;
  user-select: none;

  &:hover {
    color: @color-primary;
    background-color: rgba(@color-primary-rgb, 0.15);
  }
}
</style>
