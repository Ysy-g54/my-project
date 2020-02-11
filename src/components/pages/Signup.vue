<template>
  <Header>
    <div slot="header">
      <BackHeader :title="'アカウントを作成'" :isLoading="isLoading" @save-success="validateUser"></BackHeader>
    </div>
    <div slot="main">
      <md-app>
        <md-app-content>
          <md-field md-clearable>
            <md-input v-model="userName" placeholder="アカウント名"></md-input>
          </md-field>
          <md-field md-clearable :class="getValidationClass('mailAddress')">
            <md-input v-model="mailAddress" placeholder="メールアドレス"></md-input>
            <span class="md-error" v-if="!$v.mailAddress.required">{{ "メールアドレスは必須です。" }}</span>
          </md-field>
          <md-field :class="getValidationClass('password')">
            <md-input v-model="password" placeholder="パスワード" type="password"></md-input>
            <span class="md-error" v-if="!$v.password.required">{{ "パスワードは必須です。" }}</span>
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
import "firebase/firestore";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      database: firebase.firestore(),
      userName: "",
      mailAddress: "",
      password: "",
      message: "",
      duration: 10000,
      isLoading: true
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
    getValidationClass(fieldName) {
      const field = this.$v[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    async validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        await this.saveSuccess();
      }
      this.isLoading = !this.isLoading;
    },
    async saveSuccess() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.mailAddress, this.password)
        .catch(() => {
          this.isLoading = !this.isLoading;
          this.showFailureMessage();
        });
      let signupUser = await firebase.auth().currentUser;
      await signupUser.updateProfile({
        displayName: this.userName
      });
      await this.database.collection("userSetting").add({
        userId: signupUser.uid,
        memoDisplayForm: "0"
      });
      await signupUser.sendEmailVerification().catch(() => {
        this.showFailureMessage();
      });
      await this.$store.dispatch("findLoginUser");
      this.$router.push({
        name: "memos"
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
