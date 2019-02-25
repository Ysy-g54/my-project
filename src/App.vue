<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view></router-view>
  </div>
</template>
<script>
import GlobalHeader from "@/components/organisms/GlobalHeader";
export default {
  methods: {},
  components: { GlobalHeader }
};
</script>

<style scoped>
</style>
