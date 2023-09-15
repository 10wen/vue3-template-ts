<template>
  <div>
    <img src="./img.jpg" alt="" width="300" height="300" id="img" />
  </div>
</template>

<script setup lang="ts">
import { useCanvas2Base64 } from "./useCanvas2Base64"
useCanvas2Base64({ el: '#img' }).then( res => {
  console.log(res);
})

</script>

<style scoped>

</style>