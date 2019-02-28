<template>
  <div>
    <Dialog ref="dialog" :content="dialogContent" @confirm-dialog="confirmDialog"></Dialog>
    <h2>ゴミ箱</h2>
    <div>
      <MemoCard
        ref="memoCard"
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
import MemoCard from "@/components/molecules/MemoCard";
export default {
  data() {
    return {
      message: "",
      button: "",
      duration: 0,
      isDialogActive: false,
      dialogContent: "完全に削除してもいいですか？"
    };
  },
  methods: {
    confirmDialog() {
      this.$refs.memoCard.deleteMemo();
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
    MemoCard
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

#hello {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}
</style>
