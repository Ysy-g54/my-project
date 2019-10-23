<template>
  <Header>
    <div slot="header">
      <BackHeader :title="'パスワードをリセット'" :isShowSaveButton="false"></BackHeader>
    </div>
    <div slot="main">
      <md-content md-theme="selection-black">
        <p>メールを送信しました。メールに記載されたリンクをクリックするとパスワードをリセットできます。</p>
        <p>メールが届かない場合、迷惑メールやスパムフォルダーなどもご確認ください。</p>
      </md-content>
      <div class="md-layout md-alignment-center">
        <md-button @click="goLoginClick">ログイン画面へ戻る</md-button>
      </div>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </Header>
</template>

<script>
import BackHeader from "@/components/organisms/BackHeader";
export default {
  data() {
    return {};
  },
  methods: {
    goLoginClick() {
      this.$router.push({
        name: "login"
      });
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
