<template>
  <div name="global-header">
    <md-tabs md-alignment="left">
      <md-tab @click="goHome" md-label="Home"></md-tab>
      <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({
        path: "/goal"
      });
    }
  },
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
