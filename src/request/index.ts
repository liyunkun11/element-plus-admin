import axios from "axios";
import type { AxiosInstance } from "axios";
import { cancelRequest, getRequestBody, isNeedCancel } from "./cancel";
import { errorHandler } from "./error";

const isDev = import.meta.env.MODE === "development";

// 创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: "/api/ep-admin",
  timeout: 0,
  withCredentials: !isDev,
});

// 正在请求中的接口
const requestArr: any[] = [];

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 判断是否需要携带token
    const hasToken = localStorage.getItem("token") || localStorage.getItem("tc-token");
    if (hasToken) {
      config.headers.Authorization = `Bearer ${hasToken}`;
    }
    // 是否需要取消请求
    const needCancel = isNeedCancel(config.url ?? "");
    if (needCancel) {
      cancelRequest(config, requestArr);
      config.cancelToken = new axios.CancelToken((cancelFn) => {
        const requestBody = getRequestBody(config);
        requestArr.push({
          requestBody,
          cancelFn,
        });
      });
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  async (response) => {
    const res = response.data;
    if (response.status === 200) {
      // 处理非正常响应
      if (res.code !== 20000) {
        errorHandler(res.code, res.msg ?? res.message ?? "服务器异常");
        return await Promise.reject(res);
      }
      else {
        return await Promise.resolve(res);
      }
    }
    else {
      return await Promise.reject(res);
    }
  },
  async (error) => {
    const { response } = error;
    if (response) {
      const { status } = response;
      errorHandler(status, "");
      return await Promise.reject(response);
    }
    return await Promise.reject(error);
  },
);

export default instance;
