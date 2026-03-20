import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/dashboard",
    meta: { hidden: true },
  },
  {
    path: "/login",
    name: "Login",
    component: async () => await import("@/views/login/index.vue"),
    meta: { hidden: true, title: "登录" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export default router;
