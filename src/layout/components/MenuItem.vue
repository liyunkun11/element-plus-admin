<template>
  <template v-if="isFirstLevel && menu.children && menu.children.length === 1">
    <!-- 一级菜单下只有一个子菜单时，直接渲染一级菜单项 -->
    <el-menu-item :index="menu.children[0].path">
      <svg-icon :name="getMenuIcon(menu.children[0])" />
      <span>{{ getMenuTitle(menu.children[0]) }}</span>
    </el-menu-item>
  </template>

  <!-- 多层菜单 -->
  <template v-else-if="menu.children && menu.children.length > 0">
    <el-sub-menu :index="menu.path">
      <template #title>
        <svg-icon :name="getMenuIcon(menu)" />
        <span>{{ getMenuTitle(menu) }}</span>
      </template>
      <menu-item
        v-for="child in menu.children"
        :key="child.path"
        :menu="child"
        :is-first-level="false"
      />
    </el-sub-menu>
  </template>

  <!-- 一级菜单下没有子菜单时，渲染一级菜单项 -->
  <template v-else>
    <el-menu-item :index="menu.path">
      <svg-icon :name="getMenuIcon(menu)" />
      <span>{{ getMenuTitle(menu) }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";

withDefaults(defineProps<{
  menu: RouteRecordRaw
  isFirstLevel?: boolean
}>(), {
  isFirstLevel: true,
});

// 获取菜单图标
const getMenuIcon = (menu: RouteRecordRaw) => {
  return menu.meta?.icon as string || "simple/page-outlined";
};
// 获取菜单标题
const getMenuTitle = (menu: RouteRecordRaw) => {
  return menu.meta?.title as string || menu.path;
};
</script>

<style lang="less" scoped>
.svg-icon {
  font-size: 18px;
  margin-right: 6px;
}
</style>
