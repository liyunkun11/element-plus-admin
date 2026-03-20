import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: { title: "系统管理", icon: "simple/nest-outlined" },
    children: [
      {
        path: "/system/user",
        name: "SystemUser",
        meta: { title: "用户管理" },
        component: async () => await import("@/views/system-user/index.vue"),
      },
      {
        path: "/system/role",
        name: "SystemRole",
        meta: { title: "角色管理" },
        component: async () => await import("@/views/system-role/index.vue"),
      },
      {
        path: "/system/menu",
        name: "SystemMenu",
        meta: { title: "菜单管理" },
        component: async () => await import("@/views/system-menu/index.vue"),
      },
    ],
  },
];

export default routes;
