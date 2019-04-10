<script>
// import Chart from "chart.js";
import { Pie } from "vue-chartjs";

// const { reactiveProp } = mixins;

const DEFAULT_OPTIONS = {
  events: ["click"],
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
  responsive: true
};
export default {
  data() {
    return {
      chartData: {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    };
  },
  methods: {
    createChart() {
      this.renderChart(this.chartData, DEFAULT_OPTIONS);
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },
  computed: {},
  extends: Pie,
  //   mixins: [reactiveProp],
  mounted() {
    this.createChart();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
