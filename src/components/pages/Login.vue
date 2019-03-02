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
import Snackbar from "@/components/atoms/Snackbar";
import firebase from "firebase";
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
    onLoginClick() {
      if (this.mailAddress === "" || this.password === "") {
        this.showFailureMessage();
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mailAddress, this.password)
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
      firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
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
  created() {
    console.error(firebase.apps);
  },
  components: {
    Snackbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
