<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <div>
        <md-button class="md-icon-button" @click="onAvatarClick">
          <md-icon>account_circle</md-icon>
        </md-button>
      </div>
      <div class="md-toolbar-row">
        <md-tabs class="md-primary" :md-active-tab="'tab-'+$route.name">
          <md-tab id="tab-memo" md-label="書留め" :to="{name: 'memo'}"></md-tab>
          <md-tab id="tab-goal" md-label="目標進捗" :to="{name: 'goal'}"></md-tab>
        </md-tabs>
      </div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible">
      <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>
      <md-list>
        <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">ゴミ箱</span>
        </md-list-item>
        <md-divider></md-divider>
        <md-list-item @click="onLogoutClick">ログアウト</md-list-item>
      </md-list>
    </md-app-drawer>
    <md-app-content>
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: false
    };
  },
  methods: {
    onAvatarClick() {
      this.menuVisible = true;
    },
    onLogoutClick() {
      // FIXME ログアウト処理追加
      this.$router.push({
        path: "/login"
      });
    }
  },
  created() {
    console.error(this.$route.name);
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-app {
  max-height: 740px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
