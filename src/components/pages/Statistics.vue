<template>
  <div>
    <span class="md-title">現時点の統計</span>
    <Chart></Chart>
  </div>
</template>

<script>
import _ from "lodash";
import { categories } from "../../constants";
import Chart from "@/components/organisms/Chart";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data() {
    return {
      memoCategories: [],
      database: firebase.firestore()
    };
  },
  methods: {},
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
          //   if (
          //     categories.find(
          //       category => category.categoryId === document.data().categoryId
          //     )
          //   ) {
          //   } else if (document.data().categoryId === "") {
          //   }

          categories.forEach(category => {
            if (document.data().categoryId === category.categoryId) {
              _.set(
                this.memoCategories,
                `${category.categoryId}.count`,
                _.get(this.memoCategories, `${category.categoryId}.count`, 0) +
                  1
              );
            } else if (document.data().categoryId === "") {
              _.set(
                this.memoCategories,
                "0.count",
                _.get(this.memoCategories, "0.count", 0) + 1
              );
            }
          });
        });
        console.error(this.memoCategories);
      });
  },
  components: {
    Chart
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
