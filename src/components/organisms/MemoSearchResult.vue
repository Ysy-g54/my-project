<template>
  <div v-if="isNotEmptyResult">
    <div>
      <span class="md-title">{{ resultMemos.length }}</span>
      <span class="md-subheading">個</span>
    </div>
    <div v-if="$store.getters['getLoginUser'].memoDisplayForm === '0'">
      <MemoCard
        v-for="memo in resultMemos"
        :key="memo.memoId"
        :memo="memo"
        @on-edit-click="onEditClick"
        @on-delete-click="onDeleteClick"
        @on-favorite="onFavorite"
        @on-done="onDone"
      ></MemoCard>
    </div>
    <div v-else>
      <MemoList :memos="resultMemos" @on-edit-click="onEditClick" @on-delete-click="onDeleteClick"></MemoList>
    </div>
  </div>
  <div v-else>
    <md-empty-state md-icon="search" md-label="検索結果0件です。" md-description="検索条件を変えて再度検索して下さい。"></md-empty-state>
  </div>
</template>

<script>
import _ from "lodash";
import { categories } from "../../constants";
import memoService from "@/service/memo-service";
import firebase from "firebase";
import "firebase/firestore";
import MemoCard from "@/components/organisms/MemoCard";
import MemoList from "@/components/organisms/MemoList";
export default {
  data() {
    return {
      database: firebase.firestore(),
      memos: [],
      modifiedMemo: null,
      resultMemos: [],
      isNotEmptyResult: true
    };
  },
  methods: {
    async searchMemo() {
      let querySnapshot = await memoService.searchByDeleteFlg(
        this.$store.getters["getLoginUser"].uid,
        false
      );
      querySnapshot.forEach(document => {
        let memoSnapshot = _.set(document.data(), "memoId", document.id);
        this.memos.push(memoSnapshot);
      });
    },
    async filterMemo(q) {
      let filterCategoryIds = await categories
        .filter(category => category.categoryNm.includes(q))
        .map(filterCategory => filterCategory["categoryId"]);
      this.resultMemos = [];
      this.resultMemos = await this.memos.filter(
        memo =>
          memo.memo.includes(q) ||
          filterCategoryIds.find(categoryId => categoryId === memo.categoryId)
      );
      this.isNotEmptyResult = !_.isEmpty(this.resultMemos);
    },
    async filterMemoByCategoryId(categoryId) {
      this.resultMemos = [];
      this.resultMemos = await this.memos.filter(
        memo => memo.categoryId === categoryId
      );
      this.isNotEmptyResult = !_.isEmpty(this.resultMemos);
    },
    async onEditClick(memoId) {
      if (this.isDiscard) {
        await memoService.modifyDeleteFlg(memoId, false).catch(error => {
          console.error("Error adding document: ", error);
        });
        await this.searchMemo();
        await this.$emit("restore-memo");
      } else {
        this.$router.push({
          name: "memoModification",
          params: { memoId }
        });
      }
    },
    onDeleteClick(memo) {
      this.memoId = memo.memoId;
      if (this.isDiscard) {
        this.$emit("delete-confirm");
      } else {
        this.deleteMemo();
      }
    },
    async onFavorite(memo) {
      await this.database
        .collection("memo")
        .doc(memo.memoId)
        .update({
          favoriteFlg: !memo.favoriteFlg
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
      await this.searchMemoByMemoId(memo.memoId);
      await this.setModifiedMemoDetail(memo.memoId);
    },
    async onDone(memo) {
      await this.database
        .collection("memo")
        .doc(memo.memoId)
        .update({
          doneFlg: !memo.doneFlg
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
      await this.searchMemoByMemoId(memo.memoId);
      await this.setModifiedMemoDetail(memo.memoId);
    },
    async deleteMemo() {
      await (this.isDiscard
        ? this.database
            .collection("memo")
            .doc(this.memoId)
            .delete()
        : memoService.modifyDeleteFlg(this.memoId, true)
      ).catch(error => {
        console.error("Error adding document: ", error);
      });
      await this.searchMemo();
      await this.$emit("delete-memo");
    },
    async searchMemoByMemoId(memoId) {
      let querySnapshot = await memoService.searchByMemoId(memoId);
      if (querySnapshot.exists) {
        let data = querySnapshot.data();
        _.set(data, "memoId", querySnapshot.id);
        this.modifiedMemo = data;
      } else {
        this.snackbarMessage =
          "更新するメモがないため、新規メモを表示しています。";
        this.$refs.snackbar.openSnackbar();
      }
    },
    async setModifiedMemoDetail(memoId) {
      let modifiedMemos = await this.resultMemos.filter(memo => {
        return memo.memoId !== memoId;
      });
      this.resultMemos = [];
      this.resultMemos = await modifiedMemos;
      await this.resultMemos.push(this.modifiedMemo);
    }
  },
  watch: {
    async "$route.query.q"() {
      if (this.$route.query.q !== "") {
        await this.filterMemo(this.$route.query.q);
      } else {
        this.$router.push({
          name: "memos"
        });
      }
    }
  },
  props: {},
  computed: {},
  async created() {
    await this.searchMemo();
    if (this.$route.query.q !== undefined && this.$route.query.q !== "") {
      await this.filterMemo(this.$route.query.q);
    } else if (this.$route.params.categoryId !== undefined) {
      await this.filterMemoByCategoryId(this.$route.params.categoryId);
    }
  },
  components: {
    MemoCard,
    MemoList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
