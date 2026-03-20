import { defineStore } from "pinia";
import Color from "color";
import { getCssVar, removeCssVar, setCssVar } from "@/utils/cssvar";

export interface ThemeStore {
  themeMode: "light" | "dark" // 主题模式
  primaryColor: string // 主题色
  successColor: string // 成功色
  warningColor: string // 警告色
  infoColor: string // 信息色
  dangerColor: string // 危险色
}

export const STORE_KEY = "ELEMENT_PLUS_ADMIN_THEME";

export type ColorType = "primary" | "success" | "warning" | "info" | "danger";

export const useThemeStore = defineStore("theme", {
  state: (): ThemeStore => {
    return {
      themeMode: "light",
      primaryColor: "#0f7deb",
      successColor: "#00b42a",
      warningColor: "#E6A23C",
      infoColor: "#73767a",
      dangerColor: "#f53f3f",
    };
  },
  actions: {
    // 设置主题模式
    setThemeMode(mode: "light" | "dark") {
      this.themeMode = mode;
      document.documentElement.setAttribute("theme-mode", mode);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(mode);
      this.applyThemeColors();
    },
    // 设置主题颜色
    setThemeColor(type: ColorType, color: string) {
      const cssKey = `--el-color-${type}`;
      const mixColor = this.themeMode === "light" ? "#ffffff" : "#141414";
      const darkMixColor = this.themeMode === "dark" ? "#ffffff" : "#141414";
      const colorsMap: Record<string, string> = {
        "light-3": Color(color).mix(Color(mixColor), 0.3).hex(),
        "light-5": Color(color).mix(Color(mixColor), 0.5).hex(),
        "light-7": Color(color).mix(Color(mixColor), 0.7).hex(),
        "light-8": Color(color).mix(Color(mixColor), 0.8).hex(),
        "light-9": Color(color).mix(Color(mixColor), 0.9).hex(),
        "dark-2": Color(color).mix(Color(darkMixColor), 0.2).hex(),
        "rgb": Color(color).rgb().array().join(","),
      };
      // 设置颜色变量
      setCssVar(`${cssKey}`, color);
      const keys = Object.keys(colorsMap);
      for (const key of keys) {
        setCssVar(`${cssKey}-${key}`, colorsMap[key]);
      }
      // 设置缓存
      this[`${type}Color`] = color;
    },
    // 恢复主题颜色
    restoreThemeColor(type: ColorType) {
      // 删除store里面的值
      this[`${type}Color`] = "";
      // 移除cssVar变量
      const cssKey = `--el-color-${type}`;
      removeCssVar(cssKey);
      const cssVarArr = ["light3", "light5", "light7", "light8", "light9", "dark2", "rgb"];
      cssVarArr.forEach((item) => {
        const key = `${cssKey}-${item}`;
        removeCssVar(key);
      });
      // 恢复默认颜色
      this.setThemeColor(type, getCssVar(cssKey));
    },
    // 应用主题颜色
    applyThemeColors() {
      // 设置主题颜色
      const colors: Array<{ type: ColorType, color: string }> = [
        { type: "primary", color: this.primaryColor },
        { type: "success", color: this.successColor },
        { type: "warning", color: this.warningColor },
        { type: "info", color: this.infoColor },
        { type: "danger", color: this.dangerColor },
      ];
      colors.forEach((color) => {
        if (color.color) {
          this.setThemeColor(color.type, color.color);
        }
      });
    },
    // 清空主题缓存
    clearThemeCache() {
      localStorage.removeItem(STORE_KEY);
      this.applyThemeColors();
    },
  },
  persist: [
    {
      key: STORE_KEY,
      storage: window.localStorage,
    },
  ],
});
