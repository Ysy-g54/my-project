<template>
  <div>
    <md-empty-state md-icon="hourglass_empty" md-label="Coming Soon..."></md-empty-state>
    <div v-if="false">
      <md-radio v-model="radio" :value="0" class="md-primary">カード</md-radio>
      <md-radio v-model="radio" :value="1" class="md-primary">リスト</md-radio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 0
    };
  },
  methods: {},
  computed: {},
  mounted() {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
