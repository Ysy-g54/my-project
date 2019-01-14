<template>
  <md-speed-dial md-event="click" class="md-bottom-right" md-direction="top">
    <md-speed-dial-target class="md-primary" @click="goGoalModification">
      <md-icon>add</md-icon>
    </md-speed-dial-target>

    <!-- FIXME prop受け取る処理を書くまでコメントアウト -->
    <!-- <md-speed-dial-content>
      <md-button class="md-icon-button">
        <md-icon>add</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>edit</md-icon>
      </md-button>
    </md-speed-dial-content>-->
  </md-speed-dial>
</template>

<script>
export default {
  data: () => ({}),
  props: {},
  computed: {},
  methods: {
    goGoalModification() {
      this.$router.push({
        path: "/goal/modification"
      });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
