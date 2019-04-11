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
    createChart() {
      setTimeout(() => {
        this.renderChart(this.chartData, DEFAULT_OPTIONS);
      }, 500);
    }
  },
  props: { chartData: { type: Object, default: null } },
  computed: {},
  extends: Pie,
  mixins: [mixins.reactiveProp],
  mounted() {
    this.createChart();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
