<template>
  <h5 class="center-align">Welcome!</h5>
  <section id="firebaseui-auth-container"></section>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
import * as firebaseui from 'firebaseui'
import "firebaseui/dist/firebaseui.css";
import {defineComponent} from "vue";
// import HelloWorld from "../components/HelloWorld";

export default defineComponent({
  name: 'PreBuiltLogin',
  components: {

  },
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: "/profile", // This redirect can be achived by route using callback.
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ]
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }
});
</script>

<style scoped>

</style>