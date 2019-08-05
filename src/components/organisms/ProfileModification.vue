<template>
  <div>
    <md-dialog-prompt
      :md-active.sync="isActiveDialog"
      v-model="editContent"
      :md-title="title + '編集'"
      :md-cancel-text="'キャンセル'"
      @md-confirm="updateItem"
    />
    <Snackbar ref="snackbar" :message="'更新しました'" />
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import Snackbar from "@/components/atoms/Snackbar";
export default {
  data() {
    return {
      database: firebase.firestore(),
      editContent: "",
      isActiveDialog: false
    };
  },
  methods: {
    openDialog() {
      this.isActiveDialog = true;
    },
    updateItem() {
      let currentUser = firebase.auth().currentUser;

      (!(this.title === "メールアドレス")
        ? currentUser.updateProfile({
            displayName:
              this.title === "名前"
                ? this.editContent
                : this.$store.getters["getLoginUser"].displayName,
            photoURL:
              this.$route.params.target === "写真"
                ? this.editContent
                : this.$store.getters["getLoginUser"].photoURL
          })
        : currentUser.updateEmail(this.editItem)
      ).then(() => {
        this.$store.dispatch("findLoginUser").then(() => {
          this.$refs.snackbar.openSnackbar();
        });
      });
    }
  },
  watch: {
    content() {
      this.editContent = this.content;
    }
  },
  computed: {},
  props: {
    content: { type: String, default: "" },
    title: { type: String, default: "" }
  },
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
