<template>
  <div name="back-header">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="back">
          <md-icon>arrow_back</md-icon>
        </md-button>
        <span class="md-headline">新規作成</span>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button" @click="save">
          <md-icon>send</md-icon>
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
    save() {}
  },
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
