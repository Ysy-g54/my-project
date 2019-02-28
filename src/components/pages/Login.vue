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
    <div>
      <md-button class="md-dense md-raised md-primary" @click="onLoginClick">ログイン</md-button>
    </div>
    <div>OR</div>
    <div>
      <md-button class="md-dense md-raised" @click="onGoogleLoginClick">googleアカウントでログイン</md-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      mailAddress: "",
      password: ""
    };
  },
  methods: {
    onLoginClick() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mailAddress, this.password)
        .then(() => {
          this.$router.push({
            name: "memo"
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    onGoogleLoginClick() {
      firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  },
  watch: {},
  computed: {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
