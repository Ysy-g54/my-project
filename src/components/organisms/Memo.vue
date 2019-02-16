<template>
  <div>
    <h2>書き留め一覧</h2>
    <div>
      <MemoCard @delete-memo="deleteMemo"/>
    </div>
    <Snackbar
      ref="snackbar"
      :isOpenSnackbar="isOpenSnackbar"
      :message="message"
      :button="button"
      :duration="duration"
    ></Snackbar>
    <SpeedDial/>
  </div>
</template>

<script>
import Snackbar from "@/components/atoms/Snackbar";
import MemoCard from "@/components/molecules/MemoCard";
import SpeedDial from "@/components/molecules/SpeedDial";
export default {
  data() {
    return {
      isOpenSnackbar: false,
      message: "",
      button: "",
      duration: 0
    };
  },
  methods: {
    addMemo() {
      this.isOpenSnackbar = this.$route.params.saveSuccessFlg !== undefined;
      this.message = "書き留めました";
      this.duration = 4000;
    },
    deleteMemo() {
      this.isOpenSnackbar = true;
      this.message = "メモをゴミ箱に移動しました";
      this.button = "元に戻す";
      this.duration = 10000;
      this.$refs.snackbar.openSnackbar();
    }
  },
  computed: {},
  mounted() {},
  created() {
    this.addMemo();
  },
  components: {
    Snackbar,
    MemoCard,
    SpeedDial
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
