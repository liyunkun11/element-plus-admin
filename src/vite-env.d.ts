/// <reference types="vite/client" />

declare module "echarts-gl/charts";
declare module "echarts-gl/components";

declare interface Window {
  [propName: string]: any
}

declare const __BUILD_INFO__: {
  buildTime: string
  branch: string
  tag: string
  lastCommit: string
  lastCommitMessage: string
  lastCommitTime: string
  hasUncommittedChanges: boolean
};
