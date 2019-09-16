<template>
  <div>
    <div v-for="actionHistory in actionHistorys" :key="actionHistory.actionHistoryId">
      <md-list class="md-double-line">
        <md-list-item>
          <div class="md-list-item-text">
            <p>
              {{ formatDate(actionHistory.actionDateTime, "YYYY/MM/DD HH:mm") + " "
              + getDataNm(actionHistory.dataType) + "を" + getActionNm(actionHistory.actionType) + "しました。" }}
            </p>
          </div>
        </md-list-item>
        <md-divider></md-divider>
      </md-list>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import firebase from "firebase";
import "firebase/firestore";
import { actionTypes, dataTypes } from "../../constants";
export default {
  data() {
    return {
      actionHistorys: [],
      database: firebase.firestore()
    };
  },
  methods: {
    async searchActionHistory() {
      await this.database
        .collection("actionHistory")
        .where("userId", "==", this.$store.getters["getLoginUser"].uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(document => {
            let data = document.data();
            _.set(data, "actionHistoryId", document.id);
            this.actionHistorys.push(data);
          });
        });
    },
    getActionNm(actionType) {
      let actionNm = "";
      actionTypes.find(action => {
        if (actionType === action.actionType) {
          actionNm = action.actionNm;
          return true;
        }
      });
      return actionNm;
    },
    getDataNm(dataType) {
      let dataNm = "";
      dataTypes.find(data => {
        if (dataType === data.dataType) {
          dataNm = data.dataNm;
          return true;
        }
      });
      return dataNm;
    }
  },
  watch: {},
  computed: {},
  created() {
    this.searchActionHistory();
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
