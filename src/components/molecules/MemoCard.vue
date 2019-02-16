<template>
  <div>
    <md-card v-for="(memo, index) in memos" :key="index">
      <md-card-header>
        <div>
          <span class="md-title">{{memo.title}}</span>
        </div>
        <div class="md-subhead">登録日：{{memo.insertDateTime }}</div>
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
              <md-menu-item @click="onDeleteClick(memo[index])">
                <span>削除</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.</md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    memos: [
      { title: "test", insertDateTime: "2018/01/13" },
      { title: "test2", insertDateTime: "2018/01/14" },
      { title: "test3", insertDateTime: "2018/01/15" },
      { title: "test3", insertDateTime: "2018/01/15" }
    ]
  }),
  methods: {
    onEditClick(memo) {
      this.$router.push({
        path: "/memo/modification"
      });
    },
    onDeleteClick(memo) {
      this.$emit("delete-memo");
    }
  },
  props: {},
  computed: {},
  created() {},
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
