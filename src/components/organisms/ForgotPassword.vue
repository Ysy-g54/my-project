<template>
  <Header>
    <div slot="header">
      <BackHeader :title="'パスワードをリセット'" @save-success="saveSuccess"></BackHeader>
    </div>
    <div slot="main">
      <md-app>
        <md-app-content>
          <md-field md-clearable>
            <md-input v-model="mailAddress" placeholder="メールアドレス"></md-input>
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
import "firebase/firestore";
export default {
  data() {
    return {
      mailAddress: ""
    };
  },
  methods: {
    async saveSuccess() {
      await firebase.auth().sendPasswordResetEmail(this.mailAddress);
      await this.$emit("success-send-mail");
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
