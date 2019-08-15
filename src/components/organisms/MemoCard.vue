<template>
  <md-card class="md-elevation-1">
    <md-card-content>
      <div class="text-word-wrap">{{ memo.memo }}</div>
      <img
        v-if="memo.fileUrl !== null"
        class="lazyload"
        :data-src="memo.fileUrl"
        width="auto"
        height="auto"
      />
      <div>カテゴリ：{{ formatCategory(memo.categoryId) }}</div>
      <div>
        <span class="md-subhead">作成日：{{ formatDate(memo.insertDateTime) }}</span>
      </div>
    </md-card-content>
    <md-card-actions>
      <md-button
        v-if="!isDiscard && memo.categoryId === '1'"
        class="md-icon-button"
        :class="{ 'md-primary': memo.doneFlg }"
        @click="onDoneClick"
      >
        <md-icon>done</md-icon>
      </md-button>
      <md-button
        v-if="!isDiscard"
        class="md-icon-button"
        :class="{ 'md-primary': memo.favoriteFlg }"
        @click="onFavoriteClick"
      >
        <md-icon v-if="memo.favoriteFlg">star</md-icon>
        <md-icon v-else>star_border</md-icon>
      </md-button>
      <md-menu md-size="small">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item @click="onEditClick">
            <span>{{ editMessage }}</span>
          </md-menu-item>
          <md-menu-item @click="onDeleteClick">
            <span>{{ deleteMessage }}</span>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-card-actions>
  </md-card>
</template>

<script>
import _ from "lodash";
import { categories } from "../../constants";
import moment from "moment";
export default {
  data: () => ({
    memoId: "",
    editMessage: "",
    deleteMessage: ""
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
    onDeleteClick() {
      this.$emit("on-delete-click", this.memo.memoId);
    },
    onDoneClick() {
      this.$emit("on-done", this.memo);
    },
    onFavoriteClick() {
      this.$emit("on-favorite", this.memo);
    }
  },
  computed: {},
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
  width: 245px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.text-word-wrap {
  word-wrap: break-word;
}
</style>
