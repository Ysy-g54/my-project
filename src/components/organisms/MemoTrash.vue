<template>
  <div>
    <Dialog ref="dialog" :title="title" @confirm-dialog="confirmDialog"></Dialog>
    <span class="md-title">ゴミ箱</span>
    <div>
      <Memo
        ref="memo"
        :isDiscard="true"
        @delete-memo="deleteMemo"
        @restore-memo="restoreMemo"
        @delete-confirm="deleteConfirm"
      />
    </div>
    <Snackbar ref="snackbar" :message="message" :button="button" :duration="duration"></Snackbar>
  </div>
</template>

<script>
import Snackbar from "@/components/atoms/Snackbar";
import Dialog from "@/components/molecules/Dialog";
import Memo from "@/components/organisms/Memo";
export default {
  data() {
    return {
      message: "",
      button: "",
      duration: 0,
      isDialogActive: false,
      title: "完全に削除してもいいですか？"
    };
  },
  methods: {
    confirmDialog() {
      this.$refs.memo.deleteMemo();
    },
    deleteConfirm() {
      this.$refs.dialog.openDialog();
    },
    deleteMemo() {
      this.message = "完全に削除しました";
      this.duration = 10000;
      this.$refs.snackbar.openSnackbar();
    },
    restoreMemo() {
      this.message = "復元しました";
      this.duration = 4000;
      this.$refs.snackbar.openSnackbar();
    }
  },
  computed: {},
  mounted() {},
  created() {},
  components: {
    Snackbar,
    Dialog,
    Memo
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
