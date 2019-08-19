<template>
  <div v-if="isNotEmptyMemo">
    <div>
      <span class="md-title">{{ memoCount }}</span>
      <span class="md-subheading">個</span>
    </div>
    <div class="body-2" v-if="!isDiscard && favoriteMemos.length !== 0">お気に入り</div>

    <div v-if="showFlg">
      <MemoList :memos="favoriteMemos"></MemoList>
      <MemoList :memos="memos"></MemoList>
    </div>
    <div v-else>
      <MemoCard
        v-for="memo in favoriteMemos"
        :key="memo.memoId"
        :isDiscard="isDiscard"
        :memo="memo"
        @on-edit-click="onEditClick"
        @on-delete-click="onDeleteClick"
        @on-favorite="onFavorite"
        @on-done="onDone"
      ></MemoCard>
      <md-divider v-if="!isDiscard && favoriteMemos.length !== 0" />
      <MemoCard
        v-for="memo in memos"
        :key="memo.memoId"
        :isDiscard="isDiscard"
        :memo="memo"
        @on-edit-click="onEditClick"
        @on-delete-click="onDeleteClick"
        @on-favorite="onFavorite"
        @on-done="onDone"
      ></MemoCard>
    </div>
  </div>
  <div v-else>
    <md-empty-state md-icon="create" md-label="空っぽです。" md-description="メモを追加すると、ここに表示されます。"></md-empty-state>
  </div>
</template>

<script>
import _ from "lodash";
import MemoCard from "@/components/organisms/MemoCard";
import MemoList from "@/components/organisms/MemoList";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data: () => ({
    favoriteMemos: [],
    memos: [],
    database: firebase.firestore(),
    showFlg: true
  }),
  methods: {
    searchMemo() {
      this.database
        .collection("memo")
        .where("userId", "==", this.$store.getters["getLoginUser"].uid)
        .where("deleteFlg", "==", this.isDiscard)
        .get()
        .then(querySnapshot => {
          let memosSnapshot = [];
          let favoriteMemosSnapshot = [];
          querySnapshot.forEach(document => {
            if (document.data().favoriteFlg) {
              let favoriteMemoSnapshot = _.set(
                document.data(),
                "memoId",
                document.id
              );
              favoriteMemosSnapshot.push(favoriteMemoSnapshot);
            } else {
              let memoSnapshot = _.set(document.data(), "memoId", document.id);
              memosSnapshot.push(memoSnapshot);
            }
          });
          this.favoriteMemos = favoriteMemosSnapshot;
          this.memos = memosSnapshot;
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
  props: {
    isDiscard: { type: Boolean, default: false }
  },
  computed: {
    isNotEmptyMemo() {
      return !_.isEmpty(this.memos);
    },
    memoCount() {
      return this.memos.length + this.favoriteMemos.length;
    }
  },
  created() {
    this.searchMemo();
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
