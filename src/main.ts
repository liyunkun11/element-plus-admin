import { createApp } from "vue";
import "virtual:svg-icons-register";
import "normalize.css";
import "vxe-table/lib/style.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./styles/index.less";

import App from "./App.vue";
import pinia from "./store";
import router from "./router";
import directiveRegister from "./directives";
import { getPermissionRes } from "./utils/permission";
import "./permission";

const app = createApp(App);

app.use(pinia);
app.use(directiveRegister);

const initApp = async () => {
  try {
    await getPermissionRes();
    console.log("[main.ts]权限路由加载成功");
  }
  catch (error) {
    console.error("[main.ts]权限路由加载失败:", error);
  }
  finally {
    app.use(router);
    app.mount("#app");
  }
};
initApp();
