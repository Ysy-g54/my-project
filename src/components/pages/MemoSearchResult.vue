<template>
  <div>
    <MemoSearchResult @delete-memo="deleteMemo" />
    <Snackbar ref="snackbar" :message="message" :button="button" :duration="duration"></Snackbar>
  </div>
</template>

<script>
import MemoSearchResult from "@/components/organisms/MemoSearchResult";
import Snackbar from "@/components/atoms/Snackbar";
export default {
  data() {
    return {
      message: "",
      button: "",
      duration: 0
    };
  },
  methods: {
    deleteMemo() {
      this.message = "ゴミ箱に移動しました";
      this.duration = 10000;
      this.$refs.snackbar.openSnackbar();
    }
  },
  watch: {},
  props: {},
  computed: {},
  created() {},
  components: {
    MemoSearchResult,
    Snackbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
