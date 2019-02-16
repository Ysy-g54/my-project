<template>
  <md-snackbar :md-position="position" :md-active.sync="isOpen" :md-duration="4000" md-persistent>
    <span>{{message}}</span>
    <md-button class="md-primary" @click="isOpen = false">元に戻す</md-button>
  </md-snackbar>
</template>

<script>
export default {
  data: () => ({
    isOpen: false,
    position: "center"
  }),
  methods: {
    // FIXME v-model使う
    openSnackbar() {
      this.isOpen = this.isOpenSnackbar;
    }
  },
  computed: {},
  props: {
    isOpenSnackbar: { type: Boolean, default: false },
    message: { type: String, default: "save" }
  },
  mounted() {
    this.openSnackbar();
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
