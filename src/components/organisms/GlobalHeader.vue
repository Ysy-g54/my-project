<template>
  <div name="global-header">
    <md-tabs>
      <md-tab @click="onHomeTab" md-label="Home"></md-tab>
      <md-tab @click="onPagesTab" md-label="Pages"></md-tab>
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
    onHomeTab() {
      this.$router.push({
        path: "/"
      });
    },
    onPagesTab() {
      this.$router.push({
        path: "/test"
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
