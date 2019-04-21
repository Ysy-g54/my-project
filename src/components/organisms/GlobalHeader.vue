<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <div>
          <md-button class="md-icon-button" @click="onAvatarClick">
            <md-icon>account_circle</md-icon>
          </md-button>
        </div>
        <div class="md-toolbar-row">
          <md-tabs class="md-primary" :md-active-tab="'tab-'+$route.name">
            <md-tab id="tab-memo" md-label="書留め" :to="{name: 'memoHistory'}"></md-tab>
            <md-tab id="tab-statistics" md-label="統計" :to="{name: 'statistics'}"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">memo-list</md-toolbar>
        <md-list>
          <md-list-item @click="onTrashClick">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">ゴミ箱</span>
          </md-list-item>
          <md-list-item>
            <md-icon>feedback</md-icon>
            <span class="md-list-item-text">フィードバック</span>
          </md-list-item>
          <md-divider/>
          <md-list-item @click="onLogoutClick">
            <md-icon>exit_to_app</md-icon>
            <span class="md-list-item-text">ログアウト</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  data() {
    return {
      menuVisible: false
    };
  },
  methods: {
    // ...mapActions("Login", {
    //   logout: "logout"
    // }),
    onAvatarClick() {
      this.menuVisible = true;
    },
    onTrashClick() {
      this.menuVisible = false;
      this.$router.push({
        name: "memoTrash"
      });
    },
    onLogoutClick() {
      this.$store
        .dispatch("logout")
        .then(() => {
          // Sign-out successful.
          this.$router.push({
            name: "login"
          });
        })
        .catch(error => {
          // An error happened.
          console.error(error);
        });
    }
  },
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-app {
  max-height: 615px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
