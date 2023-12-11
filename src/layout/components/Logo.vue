<script setup lang="ts">
import SvgIcon from '@/components/common/SvgIcon.vue';
import { useAppStore } from "@/store/modules/app";

const props = defineProps<{
  isCollapse: boolean
}>()

const appStore = useAppStore();
const handleToggle = () => {
  appStore.toggleSidebar(false)
}
</script>

<template>
  <div class="logo-wrapper">
    <SvgIcon name="pf-logo" class="logo" @click="handleToggle" />
    <span v-show="!props.isCollapse" class="project-name">RMAP Lite</span>
  </div>
</template>


<style lang="scss" scoped>
.logo-wrapper {
  height: 70px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  transition: all 0.35s;
}
.hideSidebar {
  .logo-wrapper {
    padding: 0 15px;
  }
}
.logo {
  min-width: 1em;
  margin-right: 12px;
  font-size: 25px;
  &:hover {
    cursor: pointer;
  }
}
.project-name {
  color: white;
}

</style>