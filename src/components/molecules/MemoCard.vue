<template>
  <div>
    <div v-if="isNotEmptyMemo">
      <md-card v-for="(memo, index) in memos" :key="index">
        <md-card-header>
          <md-card-header-text>
            <div>登録日：{{formatDate(memo.insertDateTime)}}</div>
            <div>カテゴリ：{{formatCategory(memo.categoryId)}}</div>
          </md-card-header-text>
          <md-menu md-size="big" md-direction="bottom-end">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item @click="onEditClick(memo.memoId)">
                <span>{{ editMessage }}</span>
              </md-menu-item>
              <md-menu-item @click="onDeleteClick(memo.memoId)">
                <span>{{ deleteMessage }}</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-card-header>
        <md-card-content>{{ memo.memo }}</md-card-content>
      </md-card>
    </div>
    <div v-else>空っぽです</div>
  </div>
</template>

<script>
import _ from "lodash";
import { categories } from "../../constants";
import moment from "moment";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data: () => ({
    memoId: "",
    editMessage: "",
    deleteMessage: "",
    memos: [],
    database: firebase.firestore()
  }),
  methods: {
    searchMemo() {
      this.database
        .collection("memo")
        .where("deleteFlg", "==", this.isDiscard)
        .get()
        .then(querySnapshot => {
          this.memos = [];
          querySnapshot.forEach(document => {
            let memoSnapshot = _.set(document.data(), "memoId", document.id);
            this.memos.push(memoSnapshot);
          });
        });
    },
    formatCategory(categoryId) {
      let categoryNm = "";
      categories.forEach(category => {
        if (categoryId === category.categoryId) {
          categoryNm = category.categoryNm;
        }
      });
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
      if (this.isDiscard) {
        this.database
          .collection("memo")
          .doc(memoId)
          .update({
            deleteFlg: false
          })
          .then(() => {
            this.searchMemo();
            this.$emit("restore-memo");
          })
          .catch(error => {
            console.error("Error adding document: ", error);
          });
      } else {
        this.$router.push({
          name: "memoModification",
          params: { memoId }
        });
      }
    },
    onDeleteClick(memoId) {
      this.memoId = memoId;
      if (this.isDiscard) {
        this.$emit("delete-confirm");
      } else {
        this.deleteMemo();
      }
    },
    deleteMemo() {
      (this.isDiscard
        ? this.database
            .collection("memo")
            .doc(this.memoId)
            .delete()
        : this.database
            .collection("memo")
            .doc(this.memoId)
            .update({
              deleteFlg: true
            })
      )
        .then(() => {
          this.searchMemo();
          this.$emit("delete-memo");
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    }
  },
  props: {
    isDiscard: { type: Boolean, default: false }
  },
  computed: {
    isNotEmptyMemo() {
      return !_.isEmpty(this.memos);
    }
  },
  created() {
    this.editMessage = this.isDiscard ? "復元する" : "編集する";
    this.deleteMessage = this.isDiscard ? "完全に削除する" : "ゴミ箱に移動する";
    this.searchMemo();
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-card {
  width: 285px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
