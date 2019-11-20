<template>
  <div v-if="isNotEmptyMemo">
    <div>
      <span class="md-title">{{ memoCount }}</span>
      <span class="md-subheading">個</span>
    </div>
    <md-subheader v-if="!isDiscard && favoriteMemos.length !== 0">スター付きメモ</md-subheader>
    <div v-if="$store.getters['getLoginUser'].memoDisplayForm === '0'">
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
      <md-divider v-if="!isDiscard && favoriteMemos.length !== 0" class="divider" />
      <md-subheader>メモ</md-subheader>
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
    <div v-else>
      <MemoList
        :isDiscard="isDiscard"
        :memos="favoriteMemos"
        @on-edit-click="onEditClick"
        @on-delete-click="onDeleteClick"
      ></MemoList>
      <div class="divider" v-if="!isDiscard && favoriteMemos.length !== 0" />
      <md-subheader>メモ</md-subheader>
      <MemoList
        :isDiscard="isDiscard"
        :memos="memos"
        @on-edit-click="onEditClick"
        @on-delete-click="onDeleteClick"
      ></MemoList>
    </div>
  </div>
  <div v-else>
    <md-empty-state md-icon="create" md-label="空っぽです。" md-description="メモを追加すると、ここに表示されます。"></md-empty-state>
  </div>
</template>

<script>
import _ from "lodash";
import { actionTypes, dataTypes } from "../../constants";
import MemoCard from "@/components/organisms/MemoCard";
import MemoList from "@/components/organisms/MemoList";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data: () => ({
    favoriteMemos: [],
    memos: [],
    database: firebase.firestore(),
    showFlg: true,
    isNotEmptyMemo: true
  }),
  methods: {
    searchMemo() {
      this.database
        .collection("memo")
        .where("userId", "==", this.$store.getters["getLoginUser"].uid)
        .where("deleteFlg", "==", this.isDiscard)
        .orderBy("insertDateTime", "desc")
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
          this.isNotEmptyMemo = !_.isEmpty(this.memos);
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
    async onDeleteClick(memo) {
      await this.deleteFile(memo);
      this.memoId = memo.memoId;
      if (this.isDiscard) {
        await this.$emit("delete-confirm");
      } else {
        await this.deleteMemo();
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
          if (this.isDiscard) {
            this.registerActionHistory();
          }
          this.searchMemo();
          this.$emit("delete-memo");
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    },
    async registerActionHistory() {
      await this.database.collection("actionHistory").add({
        actionType: actionTypes[2].actionType,
        dataType: dataTypes[0].dataType,
        memoId: "",
        actionDateTime: firebase.firestore.FieldValue.serverTimestamp(),
        userId: this.$store.getters["getLoginUser"].uid
      });
    },
    async deleteFile(memo) {
      if (this.isDiscard && memo.fileReference !== null) {
        let storageRef = firebase.storage().ref();
        let deleteFileRef = storageRef.child(memo.fileReference);
        await deleteFileRef.delete();
      }
    }
  },
  props: {
    isDiscard: { type: Boolean, default: false }
  },
  computed: {
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
.divider {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
