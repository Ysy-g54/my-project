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
      <md-button class="md-dense md-raised">googleアカウントでログイン</md-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mailAddress: "",
      password: ""
    };
  },
  methods: {
    onLoginClick() {
      // FIXME 認証処理追記
      this.$router.push({
        name: "Memo"
      });
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
