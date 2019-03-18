<template>
  <div>
    <md-speed-dial md-event="click" class="md-bottom-right" md-direction="top">
      <md-speed-dial-target class="md-primary" @click="goMemoModification">
        <md-icon>add</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {},
  computed: {},
  methods: {
    // FIXME 共通化
    goMemoModification() {
      this.$router.push({
        name: "memoModification"
      });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-speed-dial {
  margin-bottom: 25px;
}
</style>
