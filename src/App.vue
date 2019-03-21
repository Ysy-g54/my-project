<template>
  <transition>
    <router-view></router-view>
  </transition>
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
