<template>
  <div>
    <md-subheader>メモの表示形式</md-subheader>
    <md-radio v-model="radio" :value="'0'" class="md-primary">カード</md-radio>
    <md-radio v-model="radio" :value="'1'" class="md-primary">リスト</md-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: this.$store.getters["getLoginUser"].memoDisplayForm
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
