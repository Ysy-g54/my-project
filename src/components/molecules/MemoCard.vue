<template>
  <div>
    <md-card v-for="(memo, index) in memos" :key="index">
      <md-card-header>
        <div>
          <span class="md-title">{{memo.title}}</span>
        </div>
        <!-- <div class="md-subhead">登録日：{{memo.insertDateTime }}</div> -->
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
          <md-menu md-size="big" md-direction="bottom-end">
            <md-button class="md-icon-button" md-fab-top-right md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item @click="onEditClick(memo[index])">
                <span>編集</span>
              </md-menu-item>
              <md-menu-item @click="onDeleteClick(memo.memoId)">
                <span>削除</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>{{ memo.memo }}</md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
  </div>
</template>

<script>
import _ from "lodash";
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
        .where("deleteFlg", "==", false)
        .get()
        .then(querySnapshot => {
          this.memos = [];
          querySnapshot.forEach(document => {
            let memoSnapshot = _.set(document.data(), "memoId", document.id);
            this.memos.push(memoSnapshot);
          });
        });
    },
    onEditClick(memo) {
      this.$router.push({
        path: "/memo/modification"
      });
    },
    onDeleteClick(memoId) {
      this.database
        .collection("memo")
        .doc(memoId)
        .delete()
        .then(() => {
          this.searchMemo();
          this.$emit("delete-memo");
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    }
  },
  props: {},
  computed: {},
  created() {
    this.searchMemo();
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
