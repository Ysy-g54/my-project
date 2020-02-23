<template>
  <md-card class="md-elevation-1">
    <md-card-content>
      <div v-if="rowsCount > 5 && showableOmittedText" class="text-word-wrap">{{ getOmittedMemo }}</div>
      <div v-else class="text-word-wrap">{{ memo.memo }}</div>
      <div
        v-if="rowsCount > 5 && showableOmittedText"
        class="md-subhead see-next"
        @click="showFullText"
      >{{ "続きを見る" }}</div>
	        <div
        v-if="rowsCount > 5 && !showableOmittedText"
        class="md-subhead see-next"
        @click="hideFullText"
      >{{ "メモをたたむ" }}</div>
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
          <md-menu-item　@click="onShareClick">
            <span>{{ 'メモを共有する' }}</span>
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
import { categories } from "../../constants";
export default {
  data: () => ({
    memoId: "",
    editMessage: "",
    deleteMessage: "",
	showableOmittedText: false
  }),
  methods: {
    formatCategory(categoryId) {
      let categoryNm = "";
      categoryId === ""
        ? (categoryNm = "")
        : categories.find(category => {
            if (categoryId === category.categoryId) {
              categoryNm = category.categoryNm;
              return true;
            }
          });
      return categoryNm;
	},
    onEditClick() {
      this.$emit("on-edit-click", this.memo.memoId);
    },
    onDeleteClick() {
      this.$emit("on-delete-click", this.memo);
    },
    onDoneClick() {
      this.$emit("on-done", this.memo);
    },
    onFavoriteClick() {
      this.$emit("on-favorite", this.memo);
    },
	onShareClick() {
		this.$emit("on-share-click", this.memo);
	},
    showFullText() {
      this.showableOmittedText = false;
    },
	hideFullText() {
      this.showableOmittedText = true;
    }
  },
  computed: {
    rowsCount() {
      let text = this.memo.memo;
      if (text.match(/\r\n|\n/g) !== null) {
        return text.match(/\r\n|\n/g).length;
      } else {
        return 0;
      }
    },
    getOmittedMemo() {
      let omittedMemo = "";
      let assignmentCount = 0;
      this.memo.memo.split(/\r\n|\n/g).some(text => {
        if (assignmentCount >= 4) {
          return true;
        }
        omittedMemo += text;
        assignmentCount++;
      });
      return omittedMemo;
    }
  },
  props: {
    isDiscard: { type: Boolean, default: false },
    memo: { type: Object, default: {} }
  },
  created() {
    this.editMessage = this.isDiscard ? "復元する" : "編集する";
    this.deleteMessage = this.isDiscard ? "完全に削除する" : "ゴミ箱に移動する";
    if (this.rowsCount > 5) {
      this.showableOmittedText = true;
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-card {
  width: 233px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.text-word-wrap {
  word-wrap: break-word;
}
.see-next {
  cursor: pointer;
  cursor: hand;
}
/* .md-button.md-theme-default.md-primary .md-icon-font {
  color:var(--md-theme-default-primary-on-background, #FFFF00);
} */
</style>
