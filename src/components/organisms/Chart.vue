<script>
import { mixins, Pie } from "vue-chartjs";

const DEFAULT_OPTIONS = {
  //   layout: {
  //     padding: {
  //       left: 50,
  //       right: 70,
  //       top: 50,
  //       bottom: 50
  //     }
  //   },
  //   legend: {
  //     position: "right",
  //     labels: {
  //       boxWidth: 12,
  //       fontSize: 12
  //     }
  //   },
  responsive: true,
  maintainAspectRatio: false
};
export default {
  data() {
    return {
      //   chartData: {
      //     labels: [this.getRandomInt(), this.getRandomInt()],
      //     datasets: [
      //       {
      //         label: "Data One",
      //         backgroundColor: "#f87979",
      //         data: [this.getRandomInt(), this.getRandomInt()]
      //       }
      //     ]
      //   }
    };
  },
  methods: {
    createChart() {
      setTimeout(() => {
        this.renderChart(this.chartData, DEFAULT_OPTIONS);
      }, 500);
    }
    // getRandomInt() {
    //   return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    // }
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
