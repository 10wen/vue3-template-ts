<script lang="ts" setup>
import SvgIcon from '@/components/common/SvgIcon.vue';
import { useRouterUtil } from '@/hooks/useRouterUtil';
const { route, router } = useRouterUtil()

const visible = computed(() => (route.meta.navigateBack))
const onBack = () => {
  router.back()
}

</script>

<template>
  <div v-if="visible">
    <div class="backbtn-wrapper" @click="onBack">
      <SvgIcon name="arrow-left" size="25" />
      <span>Back</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.backbtn-wrapper {
  width: 80px;
  display: inline-block;
  font-size: 16px;
  line-height: var(--v3-navigationbar-height);
  margin-left: 15px;
  transition: all .2s;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: #778797;
  }
}

</style>