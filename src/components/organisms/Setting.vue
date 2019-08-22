<template>
  <div>
    <md-subheader>メモの表示形式</md-subheader>
    <md-radio v-model="memoDisplayForm" :value="'0'" class="md-primary">カード</md-radio>
    <md-radio v-model="memoDisplayForm" :value="'1'" class="md-primary">リスト</md-radio>
    <div class="md-layout md-alignment-top-right">
      <md-button class="md-dense md-raised md-primary" @click="saveSetting">保存</md-button>
    </div>
    <Snackbar ref="snackbar" :message="'更新しました'"></Snackbar>
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
      memoDisplayForm: this.$store.getters["getLoginUser"].memoDisplayForm
    };
  },
  methods: {
    searchMemoDisplayForm() {
      firebase
        .firestore()
        .collection("userSetting")
        .where("uid", "==", this.$store.getters["getLoginUser"].uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(document => {
            this.memoDisplayForm = document.data().memoDisplayForm;
          });
        });
    },
    saveSetting() {
      firebase
        .firestore()
        .collection("userSetting")
        .doc(this.$store.getters["getLoginUser"].userSettingId)
        .update({
          memoDisplayForm: this.memoDisplayForm
        })
        .then(() => {
          this.$store.dispatch("findLoginUser").then(() => {
            this.$refs.snackbar.openSnackbar();
          });
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
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
