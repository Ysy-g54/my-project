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
import firebase from "firebase";
import "firebase/firestore";
import MemoCard from "@/components/organisms/MemoCard";
import MemoList from "@/components/organisms/MemoList";
export default {
  data() {
    return {
      database: firebase.firestore(),
      memos: [],
      resultMemos: [],
      isNotEmptyResult: true
    };
  },
  methods: {
    async searchMemo() {
      await this.database
        .collection("memo")
        .where("userId", "==", this.$store.getters["getLoginUser"].uid)
        .where("deleteFlg", "==", false)
        .orderBy("insertDateTime", "desc")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(document => {
            let memoSnapshot = _.set(document.data(), "memoId", document.id);
            this.memos.push(memoSnapshot);
          });
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
    onFavorite(memo) {
      this.database
        .collection("memo")
        .doc(memo.memoId)
        .update({
          favoriteFlg: !memo.favoriteFlg
        })
        .then(() => {
          this.searchMemo();
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    },
    onDone(memo) {
      this.database
        .collection("memo")
        .doc(memo.memoId)
        .update({
          doneFlg: !memo.doneFlg
        })
        .then(() => {
          this.searchMemo();
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
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
