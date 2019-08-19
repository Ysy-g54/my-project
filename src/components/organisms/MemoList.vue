<template>
  <div>
    <div v-for="memo in memos" :key="memo.memoId">
      <md-list class="md-double-line">
        <md-list-item>
          <div class="md-list-item-text">
            <p>{{ memo.memo }}</p>
          </div>
          <md-button class="md-icon-button md-list-action">
            <md-icon>more_vert</md-icon>
          </md-button>
        </md-list-item>
        <md-divider></md-divider>
      </md-list>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    // searchMemo() {
    //   this.database
    //     .collection("memo")
    //     .where("userId", "==", this.$store.getters["getLoginUser"].uid)
    //     .where("deleteFlg", "==", this.isDiscard)
    //     .get()
    //     .then(querySnapshot => {
    //       let memosSnapshot = [];
    //       let favoriteMemosSnapshot = [];
    //       querySnapshot.forEach(document => {
    //         if (document.data().favoriteFlg) {
    //           let favoriteMemoSnapshot = _.set(
    //             document.data(),
    //             "memoId",
    //             document.id
    //           );
    //           favoriteMemosSnapshot.push(favoriteMemoSnapshot);
    //         } else {
    //           let memoSnapshot = _.set(document.data(), "memoId", document.id);
    //           memosSnapshot.push(memoSnapshot);
    //         }
    //       });
    //       this.favoriteMemos = favoriteMemosSnapshot;
    //       this.memos = memosSnapshot;
    //     });
    // },
    // onEditClick(memoId) {
    //   if (this.isDiscard) {
    //     this.database
    //       .collection("memo")
    //       .doc(memoId)
    //       .update({
    //         deleteFlg: false
    //       })
    //       .then(() => {
    //         this.searchMemo();
    //         this.$emit("restore-memo");
    //       })
    //       .catch(error => {
    //         console.error("Error adding document: ", error);
    //       });
    //   } else {
    //     this.$router.push({
    //       name: "memoModification",
    //       params: { memoId }
    //     });
    //   }
    // },
    // onDeleteClick(memoId) {
    //   this.memoId = memoId;
    //   if (this.isDiscard) {
    //     this.$emit("delete-confirm");
    //   } else {
    //     this.deleteMemo();
    //   }
    // },
    // onFavorite(memo) {
    //   this.database
    //     .collection("memo")
    //     .doc(memo.memoId)
    //     .update({
    //       favoriteFlg: !memo.favoriteFlg
    //     })
    //     .then(() => {
    //       this.searchMemo();
    //     })
    //     .catch(error => {
    //       console.error("Error adding document: ", error);
    //     });
    // },
    // onDone(memo) {
    //   this.database
    //     .collection("memo")
    //     .doc(memo.memoId)
    //     .update({
    //       doneFlg: !memo.doneFlg
    //     })
    //     .then(() => {
    //       this.searchMemo();
    //     })
    //     .catch(error => {
    //       console.error("Error adding document: ", error);
    //     });
    // },
    // deleteMemo() {
    //   (this.isDiscard
    //     ? this.database
    //         .collection("memo")
    //         .doc(this.memoId)
    //         .delete()
    //     : this.database
    //         .collection("memo")
    //         .doc(this.memoId)
    //         .update({
    //           deleteFlg: true
    //         })
    //   )
    //     .then(() => {
    //       this.searchMemo();
    //       this.$emit("delete-memo");
    //     })
    //     .catch(error => {
    //       console.error("Error adding document: ", error);
    //     });
    // }
  },
  props: {
    memos: { type: Array, required: false }
  },
  computed: {
    // isNotEmptyMemo() {
    //   return !_.isEmpty(this.memos);
    // },
    // memoCount() {
    //   return this.memos.length + this.favoriteMemos.length;
    // }
  },
  created() {
    // this.searchMemo();
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
