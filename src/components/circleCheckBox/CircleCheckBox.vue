<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

const props = defineProps<{
  id: string;
  disabled?: boolean;
  checked: boolean;
}>();
const emits = defineEmits<{
  onChange: [value: boolean]
}>()

const id = uuidv4();
const handleChange = (e: any) => {
  if (!props.disabled) {
    emits("onChange", e.target.checked);
  }
};
</script>

<template>
  <span :class="['check-box-wrapper', props.disabled ? 'cursor-not-allowed': '' ]">
    <input
      type="checkbox"
      :id="id"
      :checked="props.checked"
      :disabled="props.disabled"
      @change="handleChange"
    />
    <label :for="id" :class="{ 'cursor-not-allowed': props.disabled}"></label>
  </span>
</template>

<style lang="scss" scoped>
.check-box-wrapper {
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 50%;
  border: 1px solid #dcdfe6;
  cursor: pointer;
  text-align: center;
}

input[type="checkbox"] {
  display: none;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

label {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;
}

input[type="checkbox"]:checked + label {
  border: 1px solid #dcdfe6;
  background-color: #409eff;
}
</style>


<!-- usage template -->
<!-- <CircleCheckBox
  :id="row.name"
  :checked="row.role"
  :disabled="
    row.status !== 1 || row.role === 1 ||
    !checkPermission(PermissionCode.OPERATION_UPDATE)
  "
  @on-change="(checked:boolean) => handleChangeLeader(row, checked)"
/> -->