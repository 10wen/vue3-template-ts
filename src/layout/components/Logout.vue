<script setup lang="ts">
import SvgIcon from '@/components/common/SvgIcon.vue';
import { useUserInfoStore } from '@/store/modules/user';

const userStore = useUserInfoStore();
const router = useRouter();
const handleLogout = () => {
  userStore.logout()
  router.push('/login');
}
</script>

<template>
  <div class="user-box" @click="handleLogout">
    <SvgIcon name="user" />
    <span>Log out</span>
  </div>
</template>

<style lang="scss" scoped>
.user-box {
  width: 130px;
  height: 40px;
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  
  position: fixed;
  top: 10px;
  right: 10px;
  transition: all 0.2s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    margin-left: 5px;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
}

</style>