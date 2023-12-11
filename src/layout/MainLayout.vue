<script lang="ts" setup>
import AppMain from "./components/AppMain.vue";
import Sidebar from "./components/Sidebar.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import NavigateBack from "./components/NavigateBack.vue";
import Logout from "./components/Logout.vue";
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
const { sidebar } = storeToRefs(appStore);

const layoutClass = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    // light: sidebar.value.theme === "light",
  };
});
</script>

<template>
  <div class="app-wrapper" :class="layoutClass">
    <!-- 左侧边栏 -->
    <Sidebar class="sidebar-container" />
    <!-- 主容器 -->
    <div class="main-container">
      <!-- 头部导航栏和标签栏 -->
      <div class="fixed-header">
        <Breadcrumb />
        <NavigateBack />
        <Logout />
      </div>
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
$transition-time: 0.35s;

.app-wrapper {
  @extend %clearfix;
  position: relative;
  width: 100%;
}
.sidebar-container {
  background-color: var(--v3-sidebar-menu-bg-color);
  transition: width $transition-time;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.main-container {
  min-height: 100%;
  transition: margin-left $transition-time;
  margin-left: var(--v3-sidebar-width);
  position: relative;
}

.layout-header {
  position: relative;
  z-index: 9;
  box-shadow: var(--el-box-shadow-lighter);
}

.fixed-header {
  position: fixed !important;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--v3-sidebar-width));
  transition: width $transition-time;
}

.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  position: relative;
  // overflow: hidden;
}

.fixed-header + .app-main {
  height: 100vh;
  padding-top: var(--v3-navigationbar-height);
  overflow: auto;
}


.hideSidebar {
  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }
  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }
  .fixed-header {
    width: calc(100% - var(--v3-sidebar-hide-width));
  }
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--v3-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}

.withoutAnimation {
  .sidebar-container,
  .main-container {
    transition: none;
  }
}
</style>
