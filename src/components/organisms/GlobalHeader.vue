<template>
  <div class="page-container" @keydown.ctrl.191="onHelpClick">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <HelpDialog ref="helpDialog"></HelpDialog>
          <DialogConfirm ref="dialog" :title="title" @confirm-dialog="confirmDialog"></DialogConfirm>
          <md-button class="md-icon-button" @click="onAvatarClick">
            <md-avatar>
              <img v-if="isNotEmptyLoginUserPhoto" :data-src="loginUserPhoto" class="lazyload" />
              <md-icon v-else>account_circle</md-icon>
            </md-avatar>
          </md-button>
          <md-field md-clearable>
            <md-icon>search</md-icon>
            <md-input v-model="q" placeholder="メモ内容・カテゴリで検索"></md-input>
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
          <md-list-item @click="onHelpClick">
            <md-icon>help</md-icon>
            <span class="md-list-item-text">ヘルプ</span>
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
import DialogConfirm from "@/components/molecules/DialogConfirm";
import HelpDialog from "@/components/organisms/HelpDialog";
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
    async confirmDialog() {
      await this.$store.dispatch("logout").catch(error => {
        console.error(error);
      });
      await this.$router.push({
        name: "login"
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
    async onHelpClick() {
      await event.preventDefault();
      this.menuVisible = await false;
      await this.$refs.helpDialog.openDialog();
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
      if (this.q !== undefined && this.q !== "") {
        // 検索ワードがある場合は、入力したワードを設定してメモ検索結果画面に遷移します。
        this.$router.push({
          name: "memoSearch",
          query: { q: this.q }
        });
      } else if (this.$route.query.q !== undefined) {
        // this.qだけで判断してしまうと、画面のリロードをすると必ずメモ一覧画面に遷移してしまうため、
        // this.qを空白にした直後の$route.query.qがundefinedでない場合にメモ一覧画面に遷移します。
        this.$router.push({
          name: "memos"
        });
      }
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
    this.q = this.$route.query.q;
  },
  components: {
    DialogConfirm,
    HelpDialog
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
