<template>
  <div v-if="isNotEmptyMemo">
    <ShareDialog ref="shareDialog"></ShareDialog>
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
        @on-share-click="onShareClick"
      ></MemoCard>
      <md-divider v-if="!isDiscard && favoriteMemos.length !== 0" class="divider" />
      <md-subheader v-if="!isDiscard">メモ</md-subheader>
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
import actionHistoryService from "@/service/action-history-service";
import memoService from "@/service/memo-service";
import { actionTypes, dataTypes } from "../../constants";
import MemoCard from "@/components/organisms/MemoCard";
import MemoList from "@/components/organisms/MemoList";
import ShareDialog from "@/components/organisms/ShareDialog";
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
    async searchMemo() {
      let querySnapshot = await memoService.searchByDeleteFlg(
        this.$store.getters["getLoginUser"].uid,
        this.isDiscard
      );
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
    async onDeleteClick(memo) {
      await this.deleteFile(memo);
      this.memoId = memo.memoId;
      if (this.isDiscard) {
        await this.$emit("delete-confirm");
      } else {
        await this.deleteMemo();
      }
    },
    async onFavorite(memo) {
      await this.database
        .collection("memo")
        .doc(memo.memoId)
        .update({
          favoriteFlg: !memo.favoriteFlg
        })
        .catch(e => {
          console.error("Error adding document: ", e);
        });
      await this.searchMemo();
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

      await this.searchMemo();
    },
    async onShareClick(memo) {
      this.$refs.shareDialog.openDialog(memo);
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
      if (this.isDiscard) {
        await this.registerActionHistory();
      }
      await this.searchMemo();
      await this.$emit("delete-memo");
    },
    async registerActionHistory() {
      let actionHistory = {};
      actionHistory.actionType = actionTypes[2].actionType;
      actionHistory.dataType = dataTypes[0].dataType;
      actionHistory.memoId = "";
      actionHistory.actionDateTime = firebase.firestore.FieldValue.serverTimestamp();
      actionHistory.userId = this.$store.getters["getLoginUser"].uid;
      await actionHistoryService(actionHistory);
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
    MemoList,
    ShareDialog
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
