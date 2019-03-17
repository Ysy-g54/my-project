<template>
  <Header>
    <div slot="header">
      <BackHeader :title="'アカウントを作成'" @save-success="saveSuccess"></BackHeader>
    </div>
    <div slot="main">
      <md-field md-clearable>
        <md-input v-model="mailAddress" placeholder="メールアドレス"></md-input>
      </md-field>
      <md-field>
        <md-input v-model="password" placeholder="パスワード" type="password"></md-input>
      </md-field>
    </div>
  </Header>
</template>

<script>
import BackHeader from "@/components/organisms/BackHeader";
import firebase from "firebase";
export default {
  data() {
    return {
      mailAddress: "",
      password: ""
    };
  },
  methods: {
    saveSuccess() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.mailAddress, this.password)
        .then(() => {
          this.$router.push({
            name: "memo"
          });
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
