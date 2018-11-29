<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from "@/components/parts/Header";
export default {
  name: "App",
  data() {},
  methods: {},
  created() {},
  components: {
    Header
  }
};
</script>

<style scoped>
</style>
