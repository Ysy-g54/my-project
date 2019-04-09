<template>
  <div>
    <md-datepicker v-model="selectedDate"/>
    <span class="md-title">時点の統計</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: new Date()
    };
  },
  methods: {},
  watch: {},
  computed: {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
