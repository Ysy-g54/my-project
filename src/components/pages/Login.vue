<template>
  <div>
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-section-start">
          <span class="md-title">memoList</span>
        </div>
        <div class="md-toolbar-section-end">
          <md-button @click="onSignupClick">アカウント作成</md-button>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <Information></Information>
        <md-field md-clearable :class="getValidationClass('mailAddress')">
          <md-input v-model="mailAddress" placeholder="メールアドレス"></md-input>
          <span class="md-error" v-if="!$v.mailAddress.required">{{ "メールアドレスは必須です。" }}</span>
        </md-field>
        <md-field :class="getValidationClass('password')">
          <md-input v-model="password" placeholder="パスワード" type="password"></md-input>
          <span class="md-error" v-if="!$v.password.required">{{ "パスワードは必須です。" }}</span>
        </md-field>
        <div class="md-layout md-alignment-center">
          <md-button class="md-layout-item md-dense md-raised md-primary" @click="onLoginClick">ログイン</md-button>
        </div>
        <div class="md-layout md-alignment-center">OR</div>
        <div class="md-layout md-alignment-center">
          <md-button class="md-layout-item md-dense md-raised" @click="onGoogleLoginClick">
            <md-icon>
              <img :src="require('@/assets/google.png')" />
            </md-icon>googleアカウントでログイン
          </md-button>
        </div>
        <div class="md-layout md-alignment-center">
          <md-button @click="onForgotPasswordClick">パスワードを忘れた方はこちら</md-button>
        </div>
        <Snackbar ref="snackbar" :message="message" :duration="duration"></Snackbar>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import _ from "lodash";
import Information from "@/components/organisms/Information";
import Snackbar from "@/components/atoms/Snackbar";
import firebase from "firebase";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      mailAddress: "",
      password: "",
      message: "",
      duration: 10000
    };
  },
  validations: {
    mailAddress: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    onSignupClick() {
      this.$router.push({
        name: "signup"
      });
    },
    async onLoginClick() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let data = {};
      _.set(data, "mailAddress", this.mailAddress);
      _.set(data, "password", this.password);
      await this.$store.dispatch("updateLoginUser", data).catch(() => {
        this.showFailureMessage();
      });
      this.$router.push({
        name: "memos"
      });
    },
    getValidationClass(fieldName) {
      const field = this.$v[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    async onGoogleLoginClick() {
      let provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithRedirect(provider);
    },
    onForgotPasswordClick() {
      this.$router.push({
        name: "ForgotPassword"
      });
    },
    showFailureMessage() {
      this.message = "ログインに失敗しました。正しい情報を入力してください。";
      this.$refs.snackbar.openSnackbar();
    }
  },
  watch: {},
  computed: {},
  mounted() {},
  created() {},
  components: {
    Information,
    Snackbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
