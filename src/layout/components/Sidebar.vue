<script lang="ts" setup>
import Logo from "./Logo.vue";
import UserProfile from "@/layout/components/UserProfile.vue";
import { systemFunctions as menuList } from "@/config/constants";
import { getCssVariableValue } from "@/utils";
import { useAppStore } from "@/store/modules/app";

const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color");
const v3SidebarMenuTextColor = getCssVariableValue(
  "--v3-sidebar-menu-text-color"
);
const v3SidebarMenuActiveTextColor = getCssVariableValue(
  "--v3-sidebar-menu-active-text-color"
);

const route = useRoute();
const appStore = useAppStore();
const { sidebar } = storeToRefs(appStore);

const isCollapse = computed(() => !sidebar.value.opened);
const activeMenu = ref(
  computed(() => {
    const { meta, path } = route;
    return meta.activeMenu || path;
  })
);
</script>

<template>
  <div>
    <Logo :isCollapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="v3SidebarMenuBgColor"
        :text-color="v3SidebarMenuTextColor"
        :active-text-color="v3SidebarMenuActiveTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        :router="true"
      >
        <div class="menu-list" v-for="(menu, index) in menuList" :key="index">
          <el-menu-item
            v-if="menu.children.length === 0"
            :index="menu.function"
          >
            <SvgIcon v-if="menu.svgIcon" :name="menu.svgIcon" />
            <component
              v-else-if="menu.elIcon"
              :is="menu.elIcon"
              class="el-icon"
            />
            <template #title>
              <span v-html="menu.title"></span>
            </template>
          </el-menu-item>
          <el-sub-menu
            v-else
            :index="index"
            teleported
            :class="{ hideSidebar: isCollapse }"
          >
            <template #title>
              <SvgIcon v-if="menu.svgIcon" :name="menu.svgIcon" />
              <component
                v-else-if="menu.elIcon"
                :is="menu.elIcon"
                class="el-icon"
              />
              <span>{{ menu.title }}</span>
            </template>
            <div
              class="sub-menu-list"
              v-for="(subMenu, subIndex) in menu.children"
              :key="subIndex"
            >
              <el-menu-item :index="subMenu.function">
                <SvgIcon
                  v-if="subMenu.svgIcon"
                  :name="subMenu.svgIcon"
                  class="svg-icon"
                />
                <component
                  v-else-if="subMenu.elIcon"
                  :is="subMenu.elIcon"
                  class="el-icon"
                />
                <template #title>
                  {{ subMenu.title }}
                </template>
              </el-menu-item>
            </div>
          </el-sub-menu>
        </div>
      </el-menu>
    </el-scrollbar>

    <!-- user profile -->
    <UserProfile />
    
  </div>
</template>

<style lang="scss" scoped>
%tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

.has-logo {
  .el-scrollbar {
    // 多 1% 是为了在左侧模式时侧边栏最底部不显示 1px 左右的白色线条
    height: calc(101% - var(--v3-header-height));
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: var(--v3-sidebar-menu-item-height);
  line-height: normal;
  white-space: normal !important;
  display: flex;
  &.is-active,
  &:hover {
    background-color: var(--v3-sidebar-menu-hover-bg-color);
  }
  * {
    vertical-align: middle;
  }
}
.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 16px;
}

.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 16px;
}

:deep(.el-sub-menu) {
  &.is-active {
    > .el-sub-menu__title {
      color: v-bind(v3SidebarMenuActiveTextColor) !important;
    }
  }
  &.hideSidebar {
    .el-sub-menu__icon-arrow {
      display: none;
    }
    span {
      visibility: hidden;
    }
  }
}

:deep(.el-menu-item.is-active) {
  @extend %tip-line;
}

.el-menu--collapse {
  :deep(.el-sub-menu.is-active) {
    .el-sub-menu__title {
      @extend %tip-line;
    }
  }
}
</style>
