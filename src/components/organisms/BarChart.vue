<script>
import { mixins, Bar } from "vue-chartjs";

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
  props: { chartData: { type: Object, default: null } },
  computed: {},
  extends: Bar,
  mixins: [mixins.reactiveProp],
  mounted() {
    this.createChart();
  },
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
