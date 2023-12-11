<script lang="ts" setup>
import { computed } from "vue"

interface Props {
  prefix?: string
  name: string
  size?: number | string
}
const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
  size: 16
})
const size = computed(() => `${props.size}px`)
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  vertical-align: -0.15em;
  font-size: v-bind(size);
}
</style>
