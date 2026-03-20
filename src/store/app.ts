import { defineStore } from "pinia";

export interface AppStore {
  menuCollapsed: boolean // 菜单是否折叠
}

export const STORE_KEY = "ELEMENT_PLUS_ADMIN_APP";

export const useAppStore = defineStore("app", {
  state: (): AppStore => {
    return {
      menuCollapsed: false,
    };
  },
  actions: {
    // 设置菜单是否折叠
    toggleMenuCollapsed() {
      this.menuCollapsed = !this.menuCollapsed;
    },
  },
  persist: [
    {
      key: STORE_KEY,
      storage: window.localStorage,
    },
  ],
});
