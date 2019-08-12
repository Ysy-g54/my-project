<template>
  <Header>
    <div slot="header">
      <BackHeader :title="'アカウントを作成'" @save-success="saveSuccess"></BackHeader>
    </div>
    <div slot="main">
      <md-app>
        <md-app-content>
          <md-field md-clearable>
            <md-input v-model="userName" placeholder="アカウント名"></md-input>
          </md-field>
          <md-field md-clearable>
            <md-input v-model="mailAddress" placeholder="メールアドレス"></md-input>
          </md-field>
          <md-field>
            <md-input v-model="password" placeholder="パスワード" type="password"></md-input>
          </md-field>
        </md-app-content>
      </md-app>
    </div>
    <Snackbar ref="snackbar" :message="message" :duration="duration"></Snackbar>
  </Header>
</template>

<script>
import Snackbar from "@/components/atoms/Snackbar";
import BackHeader from "@/components/organisms/BackHeader";
import firebase from "firebase";
export default {
  data() {
    return {
      userName: "",
      mailAddress: "",
      password: "",
      message: "",
      duration: 10000
    };
  },
  methods: {
    saveSuccess() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.mailAddress, this.password)
        .then(() => {
          let signupUser = firebase.auth().currentUser;
          signupUser
            .updateProfile({
              displayName: this.userName
            })
            .then(() => {
              signupUser.sendEmailVerification().then(() => {
                this.$store.dispatch("findLoginUser").then(() => {
                  this.$router.push({
                    name: "memoList"
                  });
                });
              });
            });
        })
        .catch(() => {
          this.showFailureMessage();
        });
    },
    showFailureMessage() {
      this.message =
        "アカウント作成に失敗しました。正しい情報を入力してください。";
      this.$refs.snackbar.openSnackbar();
    }
  },
  watch: {},
  computed: {},
  created() {},
  components: {
    Snackbar,
    BackHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
