<template>
  <div>
    <md-card v-for="(memo, index) in memos" :key="index">
      <md-card-header>
        <div>登録日：{{memo.insertDateTime}}</div>
        <div>カテゴリ：{{formatCategory(memo.categoryId)}}</div>
      </md-card-header>
      <md-card-content>{{ memo.memo }}</md-card-content>
      <md-card-actions>
        <md-menu md-size="big" md-direction="bottom-end">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item @click="onEditClick(memo.memoId)">
              <span>編集</span>
            </md-menu-item>
            <md-menu-item @click="onDeleteClick(memo.memoId)">
              <span>削除</span>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data: () => ({
    memos: [],
    database: firebase.firestore()
  }),
  methods: {
    searchMemo() {
      this.database
        .collection("memo")
        .where("deleteFlg", "==", false)
        .get()
        .then(querySnapshot => {
          this.memos = [];
          querySnapshot.forEach(document => {
            let memoSnapshot = _.set(document.data(), "memoId", document.id);
            memoSnapshot.insertDateTime = this.formatDate(
              memoSnapshot.insertDateTime
            );
            this.memos.push(memoSnapshot);
          });
        });
    },
    formatCategory(categoryId) {
      // 定数としてまとめる
      let categoryNm = "";
      if (categoryId === "1") {
        categoryNm = "目標";
      } else if (categoryId === "2") {
        categoryNm = "メモ";
      } else if (categoryId === "3") {
        categoryNm = "ToDo";
      } else if (categoryId === "4") {
        categoryNm = "その他";
      }
      return categoryNm;
    },
    // FIXME 共通化する
    formatDate(date) {
      if (!_.isDate(date) && _.isEmpty(date)) {
        return "";
      }
      let m = moment(date.toDate());
      return m.format("YYYY/MM/DD");
    },
    onEditClick(memoId) {
      this.$router.push({
        name: "MemoModification",
        params: { memoId }
      });
    },
    onDeleteClick(memoId) {
      this.database
        .collection("memo")
        .doc(memoId)
        .delete()
        .then(() => {
          this.searchMemo();
          this.$emit("delete-memo");
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    }
  },
  props: {},
  computed: {},
  created() {
    this.searchMemo();
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
