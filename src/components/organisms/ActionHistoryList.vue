<template>
  <div>
    <div v-for="actionHistory in actionHistorys" :key="actionHistory.actionHistoryId">
      <md-list class="md-double-line">
        <md-list-item @click="goMemoModificationByMemoId(actionHistory.memoId)">
          <div class="md-list-item-text">
            <p>{{ getDataNm(actionHistory.dataType) + "を" + getActionNm(actionHistory.actionType) + "しました。" }}</p>
            <p>{{ formatDate(actionHistory.actionDateTime, "YYYY/MM/DD HH:mm") }}</p>
          </div>
        </md-list-item>
        <md-divider></md-divider>
      </md-list>
    </div>
    <div v-if="isEmptyActionHistory">
      <md-empty-state
        md-icon="history"
        md-label="空っぽです。"
        md-description="メモを追加、更新、削除すると、ここに履歴が表示されます。"
      ></md-empty-state>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import actionHistoryService from "@/service/action-history-service";
// import moment from "moment";
import { actionTypes, dataTypes } from "../../constants";
export default {
  data() {
    return {
      actionHistorys: [],
      isEmptyActionHistory: false
    };
  },
  methods: {
    async searchActionHistory() {
      let querySnapshot = await actionHistoryService.searchByUserId(
        this.$store.getters["getLoginUser"].uid
      );

      querySnapshot.forEach(document => {
        let data = document.data();
        _.set(data, "actionHistoryId", document.id);
        this.actionHistorys.push(data);
      });
      this.isEmptyActionHistory = _.isEmpty(this.actionHistorys);
    },
    goMemoModificationByMemoId(memoId) {
      if (memoId !== "") {
        this.$router.push({
          name: "memoModification",
          params: { memoId }
        });
      }
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
