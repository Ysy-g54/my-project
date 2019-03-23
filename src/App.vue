<template>
  <div id="app">
    <span v-show="is_loading">loading...</span>
    <span>loading...</span>
    <router-view v-show="!is_loading"></router-view>
  </div>
</template>
<script>
export default {
  methods: {},
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    }
  }
};
</script>

<style scoped>
</style>
