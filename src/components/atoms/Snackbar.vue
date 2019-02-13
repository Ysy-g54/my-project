<template>
  <md-snackbar :md-position="position" :md-active.sync="isOpen" :md-duration="4000" md-persistent>
    <span>save</span>
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
    },
    close
  },
  computed: {},
  props: {
    isOpenSnackbar: { type: Boolean, default: false }
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
