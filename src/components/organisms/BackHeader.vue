<template>
  <div name="back-header">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="back">
          <md-icon>arrow_back</md-icon>
        </md-button>
        <span class="md-subheading">書き留める</span>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button" @click="save">
          <md-icon>check</md-icon>
        </md-button>
      </div>
    </div>
  </div>
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
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
