<template>
  <md-tabs>
    <md-tab id="tab-home" md-label="Home"></md-tab>
    <md-tab id="tab-pages" md-label="Pages"></md-tab>
    <md-tab id="tab-posts" md-label="Posts"></md-tab>
    <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
  </md-tabs>
</template>

<script>
export default {
  name: "Tabs",
  data: () => ({
    noError: null,
    required: null,
    textarea: null,
    hasMessages: true
  }),
  computed: {
    messageClass() {
      return {
        "md-invalid": this.hasMessages
      };
    }
  },
  props: {
    inline: { type: String, default: null },
    icon: { type: String, default: null }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  background: url("../../../static/img/icons/search.png");
  background-size: cover;
}
</style>
