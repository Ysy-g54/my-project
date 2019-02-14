<template>
  <div name="global-header">
    <md-button class="md-icon-button md-raised" @click="onAvatarClick">
      <md-icon>menu</md-icon>
    </md-button>
    <md-tabs md-alignment="left">
      <md-tab md-label="Home" @click="goHome"></md-tab>
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
    onAvatarClick() {
      console.error("test");
    },
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
