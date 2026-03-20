<template>
  <div class="left-container" :class="{ collapsed: isCollapsed }">
    <div class="left-icon">
      <svg-icon :name="isCollapsed ? 'complex/icon' : 'complex/logo'" />
    </div>
    <div class="left-menu">
      <el-scrollbar>
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapsed"
          :collapse-transition="false"
          :popper-offset="12"
          router
        >
          <MenuItem
            v-for="menu in menuRoutes"
            :key="menu.path"
            :menu="menu"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import MenuItem from "./MenuItem.vue";
import { usePermissionStore } from "@/store/permission";
import { useAppStore } from "@/store/app";

const route = useRoute();
const permissionStore = usePermissionStore();
const appStore = useAppStore();

const menuRoutes = computed(() => permissionStore.menuRoutes);
const isCollapsed = computed(() => appStore.menuCollapsed);

const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style lang="less" scoped>
.left-container {
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: @box-shadow;
  background-color: @color-bg;
  will-change: width;
  transition: width 0.3s;
  border-right: 1px solid @color-border;

  &.collapsed {
    width: 64px;
  }

  .left-icon {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: @color-primary;
    font-weight: 600;
    white-space: nowrap;
    .svg-icon {
      width: 100%;
      height: 30px;
    }
  }

  .left-menu {
    flex: 1;
    min-height: 0px;
  }
}
</style>
