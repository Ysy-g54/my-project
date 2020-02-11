<template>
  <div>
    <div>
      <Memo @delete-memo="deleteMemo" />
    </div>
    <SpeedDial />
    <Snackbar ref="snackbar" :message="message" :button="button" :duration="duration"></Snackbar>
  </div>
</template>

<script>
import Snackbar from "@/components/atoms/Snackbar";
import Memo from "@/components/organisms/Memo";
import SpeedDial from "@/components/molecules/SpeedDial";
export default {
  data() {
    return {
      message: "",
      button: "",
      duration: 0
    };
  },
  methods: {
    addMemo() {
      this.message = "書き留めました";
      this.duration = 4000;
      if (this.$route.params.saveSuccessFlg !== undefined) {
        this.$refs.snackbar.openSnackbar();
      }
    },
    deleteMemo() {
      this.message = "ゴミ箱に移動しました";
      this.duration = 10000;
      this.$refs.snackbar.openSnackbar();
    }
  },
  computed: {},
  mounted() {
    this.addMemo();
  },
  created() {},
  components: {
    Snackbar,
    Memo,
    SpeedDial
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
