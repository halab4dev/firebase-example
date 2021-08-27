<template>
  <loader v-show="isLoading"></loader>
  <h5 class="center-align">Welcome!</h5>
  <section id="login-section">
    <div class='container'>
      <input placeholder="Email or Phone" v-model='input.account' class='input' />
      <input placeholder="Password" type='password' v-model='input.password' class='input' />
      <button v-on:click='signIn' class='btn default'>Sign In</button>
    </div>
    <div class="horizontal-lines-text"><span class="horizontal-lines">or</span></div>
    <div>
      <button v-on:click="signInWithFacebook" class="btn fb">Sign In with Facebook</button>
      <br/>
      <button v-on:click="signInWithGoogle" class="btn google">Sign In with Google</button>
      <br/>
      <button v-on:click="signInWithTwitter" class="btn twitter">Sign In with Twitter</button>
      <br/>
      <button v-on:click="signInWithLINE" class="btn line">Sign In with LINE</button>
    </div>
  </section>
</template>

<script lang="ts">
import firebase from "firebase";
import "firebase/auth";
import {defineComponent} from "vue";
import AuthService from "@/services/auth-service";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: 'Login',
  data() {
    return {
      input: {
        account: '',
        password: ''
      },
      isLoadingSate: true
    }
  },
  components: {
    Loader
  },
  mounted() {
    firebase.auth()
        .getRedirectResult()
        .then((result) => {
          if (!result.user) {
            this.isLoadingSate = false;
            return;
          }
          // The signed-in user info.
          // console.log(result.user);
          const user = {
            uid: result.user.uid,
            name: result.user.displayName,
            avatarUrl: result.user.photoURL
          };
          AuthService.saveCurrentUserInfo(user);
          this.isLoadingSate = false;
          this.$router.push({ name: 'Home' });
        }).catch((error) => {
          alert(`Error: ${error.code}\n${error.message}`);
    });
  },
  computed: {
    isLoading():boolean {
      return this.isLoadingSate;
    }
  },

  methods: {
    async signIn() {
      await firebase.auth().signInWithEmailAndPassword(this.input.account, this.input.password)
          .then(function(userCredential) {
            console.log(userCredential);
            const user = userCredential.user;
            console.log(user);
          }).catch(function(error) {
              console.log(error);
          });
    },

    async signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.signInWithThirdParty(provider);
    },

    async signInWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      await this.signInWithThirdParty(provider);
    },

    async signInWithTwitter() {
      const provider = new firebase.auth.TwitterAuthProvider();
      await this.signInWithThirdParty(provider);
    },

    async signInWithThirdParty(provider: firebase.auth.AuthProvider) {
      await firebase.auth().signInWithRedirect(provider);
    },

    randomString(length: number) {
      let result           = '';
      const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
      }
      return result;
    },

    signInWithLINE() {
      const authorizeUrl = process.env.VUE_APP_LINE_AUTHORIZE_URL;
      const redirectUrl = 'http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fline';
      const clientId = process.env.VUE_APP_LINE_CHANNEL_ID;
      const state = this.randomString(20);
      window.location.href = `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&state=${state}&scope=profile%20openid`;
    }
  },
});
</script>

<style scoped>

#login-section {
  margin: 0 auto;
 width: 30%;
}

/* style the container */
.container {
  position: relative;
  border-radius: 5px;
  /*background-color: #f2f2f2;*/
  /*padding: 20px 0 30px 0;*/
}

input {
  width: 95%;
  background-color: #f2f2f2;
}

.btn {
  width: 100%;
}

input, .btn {
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none; /* remove underline from anchors */
}

input:hover {
  opacity: 1;
}

.btn:hover {
  cursor: pointer;
  opacity: 1;
}

.default {
  color: #333;
  background-color: #fff;
  border: 1px solid #ccc;
}

.default:hover {
  background-color: whitesmoke;
}

/* add appropriate colors to fb, twitter and google buttons */
.fb {
  background-color: #3B5998;
  color: white;
}

.twitter {
  background-color: #55ACEE;
  color: white;
}

.google {
  background-color: #dd4b39;
  color: white;
}

.line {
  background-color: #00b900;
  color: white;
}

.horizontal-lines {
  background:#fff; padding:0 10px;
}

.horizontal-lines-text {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 20px 0 20px;
}
</style>