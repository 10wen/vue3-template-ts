import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { ElLoading, ElMessage } from "element-plus";
import { get, merge } from "lodash-es";
import { useUserInfoStoreHook } from "@/store/modules/user";

// axios.defaults.withCredentials = true;
axios.defaults.headers.common = { Accept: "*/*" };
// let loadingInstance: any = null;

/** 退出登录并强制刷新页面（会重定向到登录页） */
function logout() {
  useUserInfoStoreHook().logout()
  location.reload()
}

function createService() {
  // 创建一个 axios 实例命名为 service
  const service = axios.create();
  // 添加请求拦截器
  service.interceptors.request.use(
    function (config: any) {
      // 在发送请求之前做些什么
      // loadingInstance = ElLoading.service({ fullscreen: true });
      return config;
    },
    function (error: any) {
      // 对请求错误做些什么
      // loadingInstance.close();
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  service.interceptors.response.use(
    async function (response: any) {
      // 2xx 范围内的状态码都会触发该函数。
      // loadingInstance.close();
      // apiData 是 api 返回的数据
      const apiData = response.data;
      // 二进制数据则直接返回
      const responseType = response.request?.responseType;
      if (responseType === "blob" || responseType === "arraybuffer")
        return apiData;
      // 与后端约定的errorCode
      const errorCode = apiData.errorCode;
      if (errorCode === undefined) {
        ElMessage.error("非本系统的接口");
        return Promise.reject(new Error("非本系统的接口"));
      }
      switch (errorCode) {
        case "0000":
          return apiData;
        case "0063":
          // Token 过期时
          return logout();
        case "1002":
          // The team member is off mission now and cannot change roles.
          ElMessage.error(apiData.errorMessage || "Error");
          return apiData;
        case "1003":
          // The team member is off mission now and cannot change roles.
          ElMessage.error(apiData.errorMessage || "Error");
          return apiData;
        default:
          // 不是正确的 code
          ElMessage.error(apiData.errorMessage || "Error");
          return Promise.reject(new Error("Error"));
      }
    },
    function (error: any) {
      // loadingInstance.close();
      // status 是 HTTP 状态码
      const status = get(error, "response.status")
      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          // Token 过期时
          logout()
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  );
  return service;
}

/** 创建请求方法 */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = useUserInfoStoreHook().accessToken;
    const defaultConfig = {
      headers: {
        // 携带 Token
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {},
    };
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config);
    return service(mergeConfig);
  };
}

/** 用于网络请求的实例 */
const service = createService();
/** 用于网络请求的方法 */
export const request = createRequest(service);
