<template>
  <Header>
    <div slot="header">
      <BackHeader :title="'パスワードをリセット'" @save-success="validateUser"></BackHeader>
    </div>
    <div slot="main">
      <md-app>
        <md-app-content>
          <md-field md-clearable :class="getValidationClass('mailAddress')">
            <md-input v-model="mailAddress" @blur="$v.mailAddress.$touch()" placeholder="メールアドレス"></md-input>
            <span
              class="md-error"
              v-if="!$v.mailAddress.email || !$v.mailAddress.required"
            >{{ "メールアドレスを正しく入力してください。" }}</span>
          </md-field>
        </md-app-content>
      </md-app>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </Header>
</template>

<script>
import BackHeader from "@/components/organisms/BackHeader";
import firebase from "firebase";
import { email, required } from "vuelidate/lib/validators";
import "firebase/firestore";
export default {
  data() {
    return {
      mailAddress: ""
    };
  },
  validations: {
    mailAddress: {
      required,
      email
    }
  },
  methods: {
    async saveSuccess() {
      await firebase.auth().sendPasswordResetEmail(this.mailAddress);
      await this.$emit("success-send-mail");
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveSuccess();
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    }
  },
  watch: {},
  computed: {},
  created() {},
  components: {
    BackHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
