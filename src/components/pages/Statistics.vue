<template>
  <div>
    <md-datepicker v-model="selectedDate"/>
    <span class="md-title">時点の統計</span>
    <Chart></Chart>
  </div>
</template>

<script>
import Chart from "@/components/organisms/Chart";
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
  components: {
    Chart
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
