<template>
  <div>
    <md-card>
      <md-card-content>
        <div class="text-pre-wrap">{{ memo.memo }}</div>
        <div>カテゴリ：{{formatCategory(memo.categoryId)}}</div>
        <div>
          <span class="md-subhead">登録日：{{formatDate(memo.insertDateTime)}}</span>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button v-if="!isDiscard" class="md-icon-button">
          <md-icon>star_border</md-icon>
        </md-button>
        <md-menu md-size="small">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item @click="onEditClick">
              <span>{{ editMessage }}</span>
            </md-menu-item>
            <md-menu-item @click="onDeleteClick(memo.memoId)">
              <span>{{ deleteMessage }}</span>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-card-actions>
    </md-card>
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
    test: [],
    database: firebase.firestore()
  }),
  methods: {
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
    onEditClick() {
      this.$emit("on-edit-click", this.memo.memoId);
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
    isDiscard: { type: Boolean, default: false },
    memo: { type: Object, default: {} }
  },
  created() {
    this.editMessage = this.isDiscard ? "復元する" : "編集する";
    this.deleteMessage = this.isDiscard ? "完全に削除する" : "ゴミ箱に移動する";
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
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
