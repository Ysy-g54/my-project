<script>
import { mixins, Pie } from "vue-chartjs";

const DEFAULT_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false
};
export default {
  data() {
    return {};
  },
  methods: {
    async createChart() {
      await this.renderChart(this.chartData, DEFAULT_OPTIONS);
    }
  },
  watch: {
    async isRenderChart() {
      await this.createChart();
    }
  },
  props: {
    chartData: { type: Object, default: {} },
    isRenderChart: { type: Boolean, default: false }
  },
  computed: {},
  extends: Pie,
  mixins: [mixins.reactiveProp],
  mounted() {},
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
