<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/pre-built-login">Pre Built Login</router-link> |
    <router-link to="/logout" v-on:click="logout">Logout</router-link>
  </div>
  <router-view/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AuthService from "@/services/auth-service";

export default defineComponent({
  name: 'App',
  methods: {
    async logout():Promise<void> {
      await AuthService.logout();
      await this.$router.push({name: 'Home'})
    }
  }
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
