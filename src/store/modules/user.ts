import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import {
  clearLocalStorage,
  getLocalStorage,
  getToken,
  removeToken,
  setLocalStorage,
  setToken,
} from "@/utils/local-storage";
import { loginApi, refreshTokenApi } from "@/api/user";
import { LoginParams, SystemAction, SystemFunction } from "@/api/user/types";

export const useUserInfoStore = defineStore("user", () => {
  const refreshToken = ref<string>(getLocalStorage("refreshToken") || "");
  const accessToken = ref<string>(getToken() || "");
  const username = ref<string>("");
  const departmentId = ref<number>(0);
  const isSupperAdmin = ref<boolean>(false);
  const systemFunctions = ref<SystemFunction[]>([])
  const systemActions = ref<SystemAction[]>([])

  /** 登录 */
  const login = async (loginParams: LoginParams) => {
    const { result } = await loginApi(loginParams);
    setToken(result.accessToken);
    setLocalStorage("refreshToken", result.refreshToken);
    accessToken.value = result.accessToken;
    refreshToken.value = result.refreshToken;
    username.value = result.username;
    departmentId.value = result.departmentId;
    isSupperAdmin.value = result.isSupperAdmin;
    systemFunctions.value = result.systemFunctions;
    systemActions.value = result.systemActions;
  };
  /** 登出 */
  const logout = () => {
    removeToken();
    clearLocalStorage();
    refreshToken.value = "";
    accessToken.value = "";
    username.value = "";
    departmentId.value = 0;
    isSupperAdmin.value = false;
    location.reload();
  };
  /** 重置 Token */
  const resetToken = () => {
    removeToken();
    accessToken.value = "";
  };
  /** 刷新 Token */
  const refreshAccessToken = async () => {
    const { result } = await refreshTokenApi({
      refreshToken: refreshToken.value,
    });
    setToken(result.accessToken);
    setLocalStorage("refreshToken", result.refreshToken);
    accessToken.value = result.accessToken;
    refreshToken.value = result.refreshToken;
  };

  return {
    accessToken,
    refreshToken,
    username,
    departmentId,
    isSupperAdmin,
    systemFunctions,
    systemActions,
    login,
    logout,
    resetToken,
    refreshAccessToken,
  };
}, {
  persist: true
});

// 组件外使用
export const useUserInfoStoreHook = () => {
  return useUserInfoStore(store);
};

export default store;
