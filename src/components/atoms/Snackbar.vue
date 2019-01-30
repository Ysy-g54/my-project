<template>
  <md-snackbar :md-position="position" :md-active.sync="showSnackbar" md-persistent>
    <span>Connection timeout. Showing limited messages!</span>
  </md-snackbar>
</template>

<script>
export default {
  data: () => ({
    position: "center"
  }),
  computed: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
