<script lang="ts" setup>
import { useRoute } from "vue-router";
import { BreadcrumbItem } from "@/router/types";

const route = useRoute();
const breadcrumbs = ref<BreadcrumbItem[]>();

const updateBreadcrumbs = () => {
  breadcrumbs.value = (route.meta.breadcrumbs as BreadcrumbItem[]) || [];
};

onMounted(() => {
  updateBreadcrumbs();
});
watch(route, () => {
  updateBreadcrumbs();
});
</script>

<template>
  <div v-if="breadcrumbs?.length">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="(item, _index) in breadcrumbs"
        :key="item.path"
        :to="{ path: item.path }"
      >
        <span>
          {{ item.title }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: var(--v3-navigationbar-height);
  margin-left: 15px;
}

</style>
