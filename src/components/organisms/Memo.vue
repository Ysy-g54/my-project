<template>
  <div v-if="isNotEmptyMemo">
    <div>
      <span class="md-title">{{ memos.length }}</span>
      <span class="md-subheading">個</span>
    </div>
    <MemoCard
      v-for="memo in memos"
      :key="memo.memoId"
      :isDiscard="isDiscard"
      :memo="memo"
      @on-edit-click="onEditClick"
      @on-delete-click="onDeleteClick"
    ></MemoCard>
  </div>
  <div v-else>空っぽです</div>
</template>

<script>
import _ from "lodash";
import MemoCard from "@/components/organisms/MemoCard";
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
        .where("userId", "==", this.$store.getters["getLoginUser"].uid)
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
    this.searchMemo();
  },
  components: {
    MemoCard
  }
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
