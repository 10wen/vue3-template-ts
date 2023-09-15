import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { ElLoading, ElMessage } from "element-plus";
import { merge } from "lodash-es"
import { useUserInfoStoreHook, useWaringStoreHook } from "@/store";
import router from "@/router"

// axios.defaults.withCredentials = true;
axios.defaults.headers.common = { Accept: "*/*" };

let loadingInstance: any = null;

function createService() {
  // 创建一个 axios 实例命名为 service
  const service = axios.create();
  // 添加请求拦截器
  service.interceptors.request.use(
    function (config: any) {
      // 在发送请求之前做些什么
      loadingInstance = ElLoading.service({ fullscreen: true });
      return config;
    },
    function (error: any) {
      // 对请求错误做些什么
      loadingInstance.close();
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  service.interceptors.response.use(
    async function (response: any) {
      const warningStore = useWaringStoreHook();
      const store = useUserInfoStoreHook();
      // 2xx 范围内的状态码都会触发该函数。
      loadingInstance.close();
      // dataAxios 是 axios 返回数据中的 data
      let dataAxios = response.data;

      // 处理blob
      if (dataAxios instanceof Blob) {
        const contentType = response.headers["content-type"];
        const contentDisposition =
          response.headers["content-disposition"]?.split("filename=");
        const fileName =
          contentDisposition &&
          contentDisposition.length &&
          contentDisposition.pop();
        if (
          contentType === "application/vnd.ms-excel" ||
          contentType === "application/pdf" ||
          contentType === "application/zip"
        ) {
          return {
            contentType,
            data: dataAxios,
            fileName: fileName || null,
          };
        } else {
          // 将 Blob 数据转换为文本格式
          const text: any = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsText(dataAxios);
          });

          // 处理文本数据
          dataAxios = JSON.parse(text);
          // console.log(dataAxios);
        }
      }

      let errorCode = dataAxios.errorCode;
      if (errorCode === "0000") {
        return dataAxios;
      } else {
        // 0060=Unauthorized fail
        // 0061=You have no permission to enter this page.
        // 0062=Your session is invalid. Please login again
        // 0063=Your session is expired. Please login again
        const codes = ["0062", "0063", "0060"];
        if (codes.indexOf(errorCode) != -1) {
          warningStore.setwarning({
            flag: true,
            message: dataAxios.errorMessage,
            button: [
              {
                name: "Log in again",
                callback: () => router.push("/"),
              },
            ],
          });
          store.sessionFail = true;
          // ElMessage.error(dataAxios.errorMessage||"Unknown error")
          // router.push("/")
        } else {
          ElMessage.error(dataAxios.errorMessage || "Unknown error");
        }
        return dataAxios;
      }
    },
    function (error: any) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      loadingInstance.close();
      const warningStore = useWaringStoreHook();
      warningStore.setwarning({
        flag: true,
        message: error.message,
        button: [
          {
            name: "Confirm",
            callback: () => {
              console.log(error.message);
            },
          },
        ],
      });
      return Promise.reject(error);
    }
  );

  return service
}

/** 创建请求方法 */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = useUserInfoStoreHook().accessToken
    const defaultConfig = {
      headers: {
        // 携带 Token
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json"
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}



/** 用于网络请求的实例 */
const service = createService()
/** 用于网络请求的方法 */
export const request = createRequest(service)