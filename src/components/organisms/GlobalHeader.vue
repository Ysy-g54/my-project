<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <Dialog ref="dialog" :title="title" @confirm-dialog="confirmDialog"></Dialog>
          <md-button class="md-icon-button" @click="onAvatarClick">
            <md-avatar>
              <img v-if="isNotEmptyLoginUserPhoto" :data-src="loginUserPhoto" class="lazyload" />
              <md-icon v-else>account_circle</md-icon>
            </md-avatar>
          </md-button>
          <md-field md-clearable>
            <md-icon>search</md-icon>
            <md-input v-model="q" placeholder="メモを検索"></md-input>
          </md-field>
        </div>
        <div class="md-toolbar-row">
          <md-tabs class="md-primary" :md-active-tab="'tab-' + $route.name">
            <md-tab id="tab-memos" md-label="メモ" :to="{name: 'memos'}"></md-tab>
            <md-tab id="tab-statistics" md-label="統計" :to="{name: 'statistics'}"></md-tab>
            <md-tab id="tab-actionHistory" md-label="行動履歴" :to="{name: 'actionHistory'}"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" class="md-scrollbar">
        <md-toolbar class="md-transparent" md-elevation="0">memoList</md-toolbar>
        <div>
          <md-avatar>
            <img v-if="isNotEmptyLoginUserPhoto" :src="loginUserPhoto" alt="Avatar" />
            <md-icon v-else>account_circle</md-icon>
          </md-avatar>
          <div class="md-body-1">{{ $store.getters["getLoginUser"].displayName }}</div>
          <div class="md-body-1">{{ $store.getters["getLoginUser"].mailAddress }}</div>
        </div>
        <md-list>
          <md-list-item @click="onTrashClick">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">ゴミ箱</span>
          </md-list-item>
          <md-list-item @click="onSettingClick">
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">設定</span>
          </md-list-item>
          <md-list-item @click="onProfileClick">
            <md-icon>person</md-icon>
            <span class="md-list-item-text">プロフィール</span>
          </md-list-item>
          <md-list-item @click="onFeedbackClick">
            <md-icon>textsms</md-icon>
            <span class="md-list-item-text">フィードバック</span>
          </md-list-item>
          <md-divider />
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
import _ from "lodash";
import Dialog from "@/components/molecules/Dialog";
export default {
  data() {
    return {
      title: "ログアウトしますか？",
      menuVisible: false,
      q: null
    };
  },
  methods: {
    onAvatarClick() {
      this.menuVisible = true;
    },
    onLogoutClick() {
      this.menuVisible = false;
      this.$refs.dialog.openDialog();
    },
    confirmDialog() {
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
    },
    onTrashClick() {
      this.menuVisible = false;
      this.$router.push({
        name: "memoTrash"
      });
    },
    onSettingClick() {
      this.menuVisible = false;
      this.$router.push({
        name: "setting"
      });
    },
    onProfileClick() {
      this.menuVisible = false;
      this.$router.push({
        name: "profile"
      });
    },
    onFeedbackClick() {
      this.menuVisible = false;
      this.$router.push({
        name: "feedback"
      });
    }
  },
  computed: {
    isNotEmptyLoginUserPhoto() {
      return !_.isEmpty(this.loginUserPhoto);
    },
    loginUserPhoto() {
      return this.$store.getters["getLoginUser"].photoUrl;
    }
  },
  watch: {
    q() {
      this.$router.push({
        name: "memoSearch",
        query: { q: this.q }
      });
    },
    "$route.name"() {
      let displayControl = "";
      if (
        this.$route.name === "memos" ||
        this.$route.name === "statistics" ||
        this.$route.name === "actionHistory"
      ) {
        displayControl = "visible";
      } else {
        displayControl = "hidden";
      }
      document.querySelector(
        ".md-tabs.md-theme-default.md-primary .md-tabs-indicator"
      ).style.visibility = displayControl;
    }
  },
  created() {
    if (this.$route.query.q !== null) {
      this.q = this.$route.query.q;
    }
  },
  components: {
    Dialog
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-app {
  height: 620px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-field.md-theme-default > .md-icon:after {
  display: none;
}
</style>
