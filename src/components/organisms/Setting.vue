<template>
  <div>
    <md-subheader>メモの表示形式</md-subheader>
    <md-radio v-model="memoDisplayForm" :value="'0'" class="md-primary">カード</md-radio>
    <md-radio v-model="memoDisplayForm" :value="'1'" class="md-primary">リスト</md-radio>
    <md-subheader>公開範囲</md-subheader>
    <md-switch v-model="publicFlg" class="md-primary">公開 ※ほかのユーザがメモを共有する場合の検索結果に表示されます。</md-switch>
    <div class="md-layout md-alignment-top-right">
      <md-button class="md-dense md-raised md-primary" @click="saveSetting">保存</md-button>
    </div>
    <Snackbar ref="snackbar" :message="message" :duration="duration"></Snackbar>
  </div>
</template>

<script>
import _ from "lodash";
import Snackbar from "@/components/atoms/Snackbar";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data() {
    return {
      duration: 4000,
      message: "更新しました",
      memoDisplayForm: this.$store.getters["getLoginUser"].memoDisplayForm,
      publicFlg: this.$store.getters["getLoginUser"].publicFlg
    };
  },
  methods: {
    async searchMemoDisplayForm() {
      let querySnapshot = await firebase
        .firestore()
        .collection("userSetting")
        .where("userId", "==", this.$store.getters["getLoginUser"].uid)
        .get();
      await querySnapshot.forEach(document => {
        this.memoDisplayForm = document.data().memoDisplayForm;
        this.publicFlg =
          document.data().publicFlg !== undefined
            ? document.data().publicFlg
            : false;
      });
    },
    async saveSetting() {
      await firebase
        .firestore()
        .collection("userSetting")
        .doc(this.$store.getters["getLoginUser"].userSettingId)
        .update({
          memoDisplayForm: this.memoDisplayForm,
          publicFlg: this.publicFlg
        })
        .catch(error => {
          this.duration = 10000;
          this.message =
            "更新に失敗しました。もう一度試すか、問い合わせてください。";
          console.error("Error adding document: ", error);
        });
      await this.$store.dispatch("findLoginUser");
      await this.$refs.snackbar.openSnackbar();
    }
  },
  computed: {},
  mounted() {},
  created() {
    if (_.isEmpty(this.memoDisplayForm)) {
      this.searchMemoDisplayForm();
    }
  },
  components: {
    Snackbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
