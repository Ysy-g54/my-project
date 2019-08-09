<template>
  <div>
    <span class="md-title">カテゴリごとの集計</span>
    <PieChart :chartData="memoCategories" :isRenderChart="isRenderChart"></PieChart>
    <!-- <BarChart :chartData="memoCategories"></BarChart> -->
  </div>
</template>

<script>
import _ from "lodash";
import { categories } from "../../constants";
import BarChart from "@/components/organisms/BarChart";
import PieChart from "@/components/organisms/PieChart";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data() {
    return {
      memoCategories: {},
      database: firebase.firestore(),
      isRenderChart: false
    };
  },
  methods: {
    formatCategory(categoryId) {
      let categoryNm = "";
      categories.forEach(category => {
        if (categoryId === category.categoryId) {
          categoryNm = category.categoryNm;
        }
      });
      return categoryNm;
    }
  },
  watch: {},
  computed: {},
  created() {
    this.database
      .collection("memo")
      .where("userId", "==", this.$store.getters["getLoginUser"].uid)
      .where("deleteFlg", "==", false)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(document => {
          categories.find(category => {
            _.set(
              this.memoCategories,
              "datasets[0].backgroundColor",
              "#A5D6A7"
            );
            if (document.data().categoryId === category.categoryId) {
              _.set(
                this.memoCategories,
                `labels[${category.categoryId}]`,
                this.formatCategory(category.categoryId)
              );
              _.set(
                this.memoCategories,
                `datasets[0].data[${category.categoryId}]`,
                _.get(
                  this.memoCategories,
                  `datasets[0].data[${category.categoryId}]`,
                  0
                ) + 1
              );
              return true;
            }
            if (document.data().categoryId === "") {
              _.set(this.memoCategories, "labels[0]", "");
              _.set(
                this.memoCategories,
                "datasets[0].data[0]",
                _.get(this.memoCategories, "datasets[0].data[0]", 0) + 1
              );
              return true;
            }
          });
        });
        this.isRenderChart = true;
      });
  },
  components: {
    BarChart,
    PieChart
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
