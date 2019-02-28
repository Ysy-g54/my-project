<template>
  <div>
    <Dialog :isActive="isDialogActive" @confirm-dialog="confirmDialog"></Dialog>
    <h2>ゴミ箱</h2>
    <div>
      <MemoCard
        ref="mamoCard"
        :isDiscard="true"
        @delete-memo="deleteMemo"
        @restore-memo="restoreMemo"
        @delete-confirm="deleteConfirm"
      />
    </div>
    <Snackbar
      ref="snackbar"
      :isOpenSnackbar="isOpenSnackbar"
      :message="message"
      :button="button"
      :duration="duration"
    ></Snackbar>
  </div>
</template>

<script>
import Snackbar from "@/components/atoms/Snackbar";
import Dialog from "@/components/molecules/Dialog";
import MemoCard from "@/components/molecules/MemoCard";
export default {
  data() {
    return {
      isOpenSnackbar: false,
      message: "",
      button: "",
      duration: 0,
      isDialogActive: false
    };
  },
  methods: {
    confirmDialog() {
      this.$refs.memoCard.deleteMemo();
    },
    deleteConfirm() {
      this.isDialogActive = true;
    },
    deleteMemo() {
      this.isOpenSnackbar = true;
      this.message = "完全に削除しました";
      this.duration = 10000;
      this.$refs.snackbar.openSnackbar();
    },
    restoreMemo() {
      this.isOpenSnackbar = true;
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
