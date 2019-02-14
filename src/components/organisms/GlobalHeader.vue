<template>
  <div name="global-header">
    <div>
      <md-button class="md-icon-button" @click="onAvatarClick">
        <md-icon>account_circle</md-icon>
      </md-button>
    </div>
    <div>
      <md-tabs md-alignment="left">
        <md-tab md-label="Home" @click="goHome"></md-tab>
        <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
      </md-tabs>
    </div>
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
  </div>
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
    goHome() {
      this.$router.push({
        path: "/goal"
      });
    }
  },
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
