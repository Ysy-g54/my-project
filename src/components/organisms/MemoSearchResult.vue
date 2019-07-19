<template>
  <div v-if="showFlg">
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
</template>

<script>
import _ from "lodash";
import firebase from "firebase";
import "firebase/firestore";
import MemoCard from "@/components/organisms/MemoCard";
export default {
  data() {
    return {
      database: firebase.firestore(),
      resultMemos: [],
      showFlg: false
    };
  },
  methods: {
    searchMemo(q) {
      this.database
        .collection("memo")
        .where("userId", "==", this.$store.getters["getLoginUser"].uid)
        .where("memo", "==", q)
        // .orderBy("memo")
        // .startAt(`\uf8ff${q}`)
        // .endAt(`${q}\uf8ff`)
        .get()
        .then(querySnapshot => {
          let memosSnapshot = [];
          querySnapshot.forEach(document => {
            let memoSnapshot = _.set(document.data(), "memoId", document.id);
            memosSnapshot.push(memoSnapshot);
          });
          this.resultMemos = memosSnapshot;
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
        }
      },
      immediate: true
    },
    resultMemos() {
      if (!_.isEmpty(this.resultMemos)) {
        this.showFlg = true;
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
