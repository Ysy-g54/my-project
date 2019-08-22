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
import Snackbar from "@/components/atoms/Snackbar";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data() {
    return {
      memoDisplayForm: null
    };
  },
  methods: {
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
  created() {},
  components: {
    Snackbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
