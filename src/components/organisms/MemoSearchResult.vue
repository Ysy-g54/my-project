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
      resultMemos: [],
      isNotEmptyResult: false
    };
  },
  methods: {
    searchMemo(q) {
      this.database
        .collection("memo")
        .where("userId", "==", this.$store.getters["getLoginUser"].uid)
        .get()
        .then(querySnapshot => {
          let memosSnapshot = [];
          querySnapshot.forEach(document => {
            let memoSnapshot = _.set(document.data(), "memoId", document.id);
            memosSnapshot.push(memoSnapshot);
          });
          // TODO 入力文字からカテゴリ名を検索し、それに紐づくカテゴリIDで検索する。
          //   let filterCategories = categories
          //     .filter(category => category.categoryNm.includes(q))
          //     .map(filterCategory => filterCategory["categoryNm"]);
          this.resultMemos = memosSnapshot.filter(resultMemo =>
            resultMemo.memo.includes(q)
          );
        });
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
    "$route.params.q": {
      async handler(q) {
        if (this.$route.params.q !== "") {
          await this.searchMemo(this.$route.params.q);
        } else {
          this.$router.push({
            name: "memoHistory"
          });
        }
      },
      immediate: true
    },
    resultMemos() {
      if (!_.isEmpty(this.resultMemos)) {
        this.isNotEmptyResult = true;
      }
    }
  },
  props: {},
  computed: {},
  created() {},
  components: {
    MemoCard
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
