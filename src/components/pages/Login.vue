<template>
  <div>
    <md-field md-clearable>
      <label>メールアドレス</label>
      <md-input v-model="mailAddress"></md-input>
    </md-field>
    <md-field>
      <label>パスワード</label>
      <md-input v-model="password" type="password"></md-input>
    </md-field>
    <div class="md-layout md-alignment-center">
      <md-button class="md-layout-item md-dense md-raised md-primary" @click="onLoginClick">ログイン</md-button>
    </div>
    <div class="md-layout md-alignment-center">OR</div>
    <div class="md-layout md-alignment-center">
      <md-button
        class="md-layout-item md-dense md-raised"
        @click="onGoogleLoginClick"
      >googleアカウントでログイン</md-button>
    </div>
    <Snackbar ref="snackbar" :message="message" :duration="duration"></Snackbar>
  </div>
</template>

<script>
import _ from "lodash";
import Snackbar from "@/components/atoms/Snackbar";
import firebase from "firebase";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      mailAddress: "",
      password: "",
      message: "",
      duration: 10000
    };
  },
  methods: {
    ...mapActions("Login", {
      login: "updateLoginUser"
    }),
    onLoginClick() {
      if (this.mailAddress === "" || this.password === "") {
        this.showFailureMessage();
        return;
      }
      let data = {};
      _.set(data, "mailAddress", this.mailAddress);
      _.set(data, "password", this.password);
      this.login(data)
        .then(() => {
          this.$router.push({
            name: "memo"
          });
        })
        .catch(() => {
          this.showFailureMessage();
        });
    },
    onGoogleLoginClick() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(() => {
          this.$router.push({
            name: "memo"
          });
        })
        .catch(() => {
          this.showFailureMessage();
        });
    },
    showFailureMessage() {
      this.message = "ログインに失敗しました。正しい情報を入力してください。";
      this.$refs.snackbar.openSnackbar();
    }
  },
  watch: {},
  computed: {},
  created() {},
  components: {
    Snackbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
