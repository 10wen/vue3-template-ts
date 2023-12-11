<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";
import { useAppStore } from "@/store/modules/app";
import { useUserInfoStore } from "@/store/modules/user";

const appStore = useAppStore();
const useStore = useUserInfoStore();
const isOpenSidebar = computed(() => appStore.sidebar.opened);

const accountName = computed(() => useStore.username);
const role = computed(() => (useStore.isSupperAdmin ? "Super Admin" : "Admin"));
</script>

<template>
  <div class="user-box">
    <div class="side-item">
      <el-tooltip
        v-if="!isOpenSidebar"
        class="box-item"
        effect="dark"
        offset="35"
        raw-content
        :content="`${accountName} <br/> ${role}`"
        placement="right"
      >
        <SvgIcon name="side-self" />
      </el-tooltip>
      <SvgIcon name="side-self" v-else />
      <span class="m-l-10" v-show="isOpenSidebar"
        >{{ accountName }} <br />
        {{ role }}</span
      >
    </div>
    <!-- <div class="side-item">
      <el-tooltip
        v-if="!isOpenSidebar"
        class="box-item"
        effect="dark"
        offset="35"
        content="app version 1.0.0"
        placement="right"
      >
        <el-icon size="16"><InfoFilled /></el-icon>
      </el-tooltip>
      <el-icon size="16" v-else><InfoFilled /></el-icon>
      <span class="m-l-10" v-show="isOpenSidebar">App version 1.0.0</span>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.user-box {
  position: absolute;
  left: 0;
  bottom: 10px;
  font-size: 14px;
  color: white;
  .side-item {
    height: 40px;
    padding: 0 20px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
