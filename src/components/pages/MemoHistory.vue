<template>
  <div>
    <MemoHistory />
  </div>
</template>

<script>
import MemoHistory from "@/components/organisms/MemoHistory";
export default {
  data() {
    return {};
  },
  methods: {},
  watch: {},
  props: {
    keyWord: { type: String, default: null }
  },
  computed: {},
  created() {},
  components: {
    MemoHistory
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
