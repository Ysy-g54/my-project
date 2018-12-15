<template>
  <div id="app">
    <div class="page-container">
      <md-app md-waterfall md-mode="fixed-last">
        <md-app-toolbar class="md-large md-dense md-primary">
          <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
              <md-button class="md-icon-button" @click="showNavigation">
                <md-icon>
                  <md-avatar>
                    <img src="https://vuematerial.io/assets/examples/avatar.jpg" alt="Avatar">
                  </md-avatar>
                </md-icon>
              </md-button>
            </div>
            <div>
              <TextField inline="検索条件" icon="search"></TextField>
            </div>
            <md-menu class="md-toolbar-section-end" md-direction="bottom-start">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon class="setting-detail"></md-icon>
              </md-button>
              <md-menu-content class="right">
                <md-menu-item>My Item 1</md-menu-item>
                <md-menu-item>My Item 2</md-menu-item>
                <md-menu-item>My Item 3</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>

          <div class="md-toolbar-row">
            <md-tabs md-sync-route>
              <md-tab id="tab-home" md-label="Home"></md-tab>
              <md-tab id="tab-pages" md-label="Pages"></md-tab>
              <md-tab id="tab-posts" md-label="Posts"></md-tab>
              <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
            </md-tabs>
          </div>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible">
          <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>
          <md-list>
            <md-list-item>
              <md-icon>move_to_inbox</md-icon>
              <span class="md-list-item-text">Inbox</span>
            </md-list-item>
            <md-list-item>
              <md-icon>send</md-icon>
              <span class="md-list-item-text">Sent Mail</span>
            </md-list-item>
            <md-list-item>
              <md-icon>delete</md-icon>
              <span class="md-list-item-text">Trash</span>
            </md-list-item>
            <md-list-item>
              <md-icon>error</md-icon>
              <span class="md-list-item-text">Spam</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>
        <md-app-content>
          <router-view></router-view>
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>
<script>
import TextField from "@/components/atoms/TextField";
export default {
  name: "App",
  data() {
    return {
      msg: "Welcome to Your Vue.js PWA",
      menuVisible: false
    };
  },
  methods: {
    showNavigation() {
      this.menuVisible = true;
    }
  },
  components: {
    TextField
  }
};
</script>

<style scoped>
body {
  margin: 0;
}

.md-app {
  max-height: 400px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}
header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
.setting-detail {
  background: url("../static/img/icons/setting-detail.png");
  background-size: cover;
}
</style>
