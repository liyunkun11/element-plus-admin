import type { RouteRecordRaw } from "vue-router";
import dashboard from "./dashboard";
import page from "./page";
import system from "./system";

const asyncRoutes: RouteRecordRaw[] = [
  ...dashboard,
  ...page,
  ...system,
];

export default asyncRoutes;
