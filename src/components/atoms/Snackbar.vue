<template>
  <md-snackbar :md-position="position" :md-active.sync="active" :md-duration="4000" md-persistent>
    <span>Connection timeout. Showing limited messages!</span>
  </md-snackbar>
</template>

<script>
export default {
  data: () => ({
    active: true,
    position: "center"
  }),
  computed: {},
  props: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
