<template>
  <loader v-show="isLoading"></loader>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import firebase from "firebase";
import AuthService from "@/services/auth-service";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "AuthLine",
  data() {
    return {
      isLoadingSate: true
    }
  },
  components: {
    Loader
  },
  mounted: async function () {
    const params = this.$route.query;
    if (params.error) {
      alert(`Login error: Code ${params.error}\nMessage: ${params.error_description}`);
      return;
    }
    const route = this.$router;
    const customToken = await AuthService.createCustomToken(params.code as string);
    await firebase.auth().signInWithCustomToken(customToken)
        .then(function(userCredential) {
          // console.log("Sign in done");
          // console.log(userCredential);

          if (userCredential && userCredential.user) {
            const user = {
              uid: userCredential.user.uid,
              name: userCredential.user.displayName as string,
              avatarUrl: userCredential.user.photoURL as string
            };
            AuthService.saveCurrentUserInfo(user);
            route.push({ name: 'Home' });
          }
        }).catch(function(error) {
          alert(`Error: ${error.code}\n${error.message}`);
        });
  },
  computed: {
    isLoading():boolean {
      return this.isLoadingSate;
    }
  },
});
</script>