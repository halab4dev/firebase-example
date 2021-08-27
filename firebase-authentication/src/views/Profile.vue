<template>
  <div class="profile">
    <img class="user-avatar" v-bind:src="user.avatarUrl" alt="User Avatar Image"/>
    <h1>{{user.name}}</h1>
  </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import AuthService from "@/services/auth-service";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Profile',
  data() {
    return {
      user: AuthService.getCurrentUserInfo()
    }
  }
});
</script>

<style scoped>
.user-avatar {
  width: auto;
  height: 100px;
  border-radius: 100px;
}
</style>