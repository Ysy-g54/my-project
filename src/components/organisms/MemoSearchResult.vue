<template>
  <div v-if="isNotEmptyResult">
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
    <md-empty-state md-icon="search" md-label="検索結果0件です。" md-description="検索条件を変えて再度検索して下さい。"></md-empty-state>
  </div>
</template>

<script>
import _ from "lodash";
import { categories } from "../../constants";
import firebase from "firebase";
import "firebase/firestore";
import MemoCard from "@/components/organisms/MemoCard";
export default {
  data() {
    return {
      database: firebase.firestore(),
      memos: [],
      resultMemos: [],
      isNotEmptyResult: false
    };
  },
  methods: {
    searchMemo(q) {
      this.database
        .collection("memo")
        .where("userId", "==", this.$store.getters["getLoginUser"].uid)
        .where("deleteFlg", "==", false)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(document => {
            let memoSnapshot = _.set(document.data(), "memoId", document.id);
            this.memos.push(memoSnapshot);
          });
        });
    },
    filterMemo(q) {
      let filterCategoryIds = categories
        .filter(category => category.categoryNm.includes(q))
        .map(filterCategory => filterCategory["categoryId"]);
      this.resultMemos = [];
      this.resultMemos = this.memos.filter(
        memo =>
          memo.memo.includes(q) ||
          filterCategoryIds.find(categoryId => categoryId === memo.categoryId)
      );
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
    "$route.query.q": {
      async handler(q) {
        if (this.$route.query.q !== "") {
          await this.filterMemo(this.$route.query.q);
        } else {
          this.$router.push({
            name: "memos"
          });
        }
      },
      immediate: true
    },
    resultMemos() {
      if (_.isEmpty(this.resultMemos)) {
        this.isNotEmptyResult = false;
      } else {
        this.isNotEmptyResult = true;
      }
    }
  },
  props: {},
  computed: {},
  created() {
    this.searchMemo();
  },
  components: {
    MemoCard
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
