<template>
  <div>
    <div v-for="(memo, index) in memos" :key="memo.memoId">
      <md-list class="md-double-line">
        <md-list-item>
          <div class="md-list-item-text">
            <p>{{ memo.memo }}</p>
            <span>作成日：{{ formatDate(memo.insertDateTime) }}</span>
          </div>
          <md-menu md-size="small">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item @click="onEditClick(memos[index].memoId)">
                <span>{{ editMessage }}</span>
              </md-menu-item>
			  <md-menu-item　@click="onShareClick(memos[index])">
                <span>{{ 'メモを共有する' }}</span>
          	  </md-menu-item>
              <md-menu-item @click="onDeleteClick(memos[index])">
                <span>{{ deleteMessage }}</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-list-item>
        <md-divider></md-divider>
      </md-list>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    editMessage: "",
    deleteMessage: ""
  }),
  methods: {
	onShareClick(memo) {
      this.$emit("on-share-click", memo);
    },
    onEditClick(memoId) {
      this.$emit("on-edit-click", memoId);
    },
    onDeleteClick(memo) {
      this.$emit("on-delete-click", memo);
    }
  },
  props: {
    isDiscard: { type: Boolean, default: false },
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
    this.editMessage = this.isDiscard ? "復元する" : "編集する";
    this.deleteMessage = this.isDiscard ? "完全に削除する" : "ゴミ箱に移動する";
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
