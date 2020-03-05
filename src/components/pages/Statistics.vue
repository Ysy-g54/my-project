<template>
  <div>
    <md-subheader>カテゴリごとの集計</md-subheader>
    <PieChart :chartData="memoCategories" :isRenderChart="isRenderChart"></PieChart>
    <md-divider />
    <div v-for="(memoLabel, index) in memoCategories.labels" :key="index">
      <md-list>
        <md-list-item class="md-double-line" @click="goMemoSearch(memoLabel)">
          <md-badge :style="getMemoCategoryColor(memoCategories, index)" />
          <p>{{ memoLabel }}</p>
          <md-icon>keyboard_arrow_right</md-icon>
        </md-list-item>
        <md-divider></md-divider>
      </md-list>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { categories } from "../../constants";
import BarChart from "@/components/organisms/BarChart";
import PieChart from "@/components/organisms/PieChart";
import memoService from "@/service/memo-service";
import * as palette from "google-palette";
export default {
  data() {
    return {
      memoCategories: {},
      isRenderChart: false
    };
  },
  methods: {
    formatCategory(categoryId) {
      let categoryNm = "";
      categories.find(category => {
        if (categoryId === category.categoryId) {
          categoryNm = category.categoryNm;
          return true;
        }
      });
      return categoryNm;
    },
    async goMemoSearch(memoLabel) {
      let categoryId = "";
      await categories.find(category => {
        if (category.categoryNm === memoLabel) {
          categoryId = category.categoryId;
          return true;
        }
      });
      if (categoryId !== "") {
        this.$router.push({
          name: "memoSearch",
          params: { categoryId }
        });
      }
    },
    getMemoCategoryColor(memoCategories, index) {
      let color = _.get(
        memoCategories,
        `datasets[0].backgroundColor[${index}]`
      );
      return "background-color: " + color;
    }
  },
  watch: {},
  computed: {},
  async created() {
    let querySnapshot = await memoService.searchByDeleteFlg(
      this.$store.getters["getLoginUser"].uid,
      false
    );
    await querySnapshot.forEach(async document => {
      await categories.find(category => {
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
    await _.set(
      this.memoCategories,
      "datasets[0].backgroundColor",
      palette("mpn65", categories.length).map(hex => {
        return "#" + hex;
      })
    );
    this.isRenderChart = await true;
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
