<template>
  <div name="global-header">
    <md-tabs>
      <md-tab @click="goHome" md-label="Home"></md-tab>
      <md-tab @click="goPages" md-label="Pages"></md-tab>
      <md-tab id="tab-posts" md-label="Posts"></md-tab>
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
    },
    goPages() {
      this.$router.push({
        path: "/goal/modification"
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
