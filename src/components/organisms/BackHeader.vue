<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="back">
            <md-icon>arrow_back</md-icon>
          </md-button>
          <span class="md-subheading">{{ title }}</span>
        </div>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="save">
            <md-icon>send</md-icon>
          </md-button>
        </div>
      </div>
    </md-app-toolbar>
  </md-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.back();
    },
    save() {
      this.$emit("save-success");
    }
  },
  props: {
    title: { type: String, default: "" }
  },
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
