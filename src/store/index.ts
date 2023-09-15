import { createPinia, defineStore } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import { reactive, ref } from "vue";

const store = createPinia();
store.use(piniaPersist);

export const useUserInfoStore = defineStore("userInfo", () => {
  const userInfo = reactive(
    JSON.parse(localStorage.getItem("userInfo") || "{}")
  );
  const accessToken = ref("");
  const sessionFail = ref(false);

  return { userInfo, accessToken, sessionFail };
});

// 组件外使用
export const useUserInfoStoreHook = () => {
  return useUserInfoStore(store);
};

export const useWaringStore = defineStore("warning", () => {
  const warningStage = reactive({
    warningFalg: false,
    warningMsg: "",
    button: [],
  });

  const setwarning = ({flag, message, button}:any) => {
    warningStage.warningFalg = flag
    if (!flag) {
      warningStage.warningMsg = ""
      warningStage.button = []
    } else {
      warningStage.warningMsg = message || "Unknown error"
      warningStage.button = button || []
    }
  }

  return { warningStage, setwarning }
});

export const useWaringStoreHook = () => {
  return useWaringStore(store)
};

export default store;
