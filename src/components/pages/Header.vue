<template>
  <div>
    <header>
      <slot name="header">
        <GlobalHeader />
      </slot>
    </header>
    <main>
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import GlobalHeader from "@/components/organisms/GlobalHeader";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {
    GlobalHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
