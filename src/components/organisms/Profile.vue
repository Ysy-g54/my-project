<template>
  <div>
    <ProfileModification
      ref="dialog"
      :title="title"
      :content="content"
      @update-success="updateSuccess"
    />
    <md-list class="md-double-line">
      <md-subheader>プロフィール</md-subheader>
      <md-list-item>
        <div class="md-list-item-text picture-title">
          <span>写真</span>
        </div>
        <md-avatar class="md-avatar-icon md-large">
          <img v-if="isNotEmptyLoginUserPhoto" :src="loginUserPhoto" alt="Avatar" />
          <md-icon v-else>account_circle</md-icon>
        </md-avatar>
        <md-button class="md-icon-button" @click="goPhotoModification">
          <md-icon>edit</md-icon>
        </md-button>
      </md-list-item>
      <md-divider></md-divider>
      <md-list-item>
        <div class="md-list-item-text">
          <span>{{ $store.getters["getLoginUser"].displayName }}</span>
          <span>名前</span>
        </div>
        <md-button
          class="md-icon-button"
          @click="onEditItemClick('名前', $store.getters['getLoginUser'].displayName)"
        >
          <md-icon>edit</md-icon>
        </md-button>
      </md-list-item>
      <md-divider></md-divider>
      <md-list-item>
        <div class="md-list-item-text">
          <span>{{ $store.getters["getLoginUser"].mailAddress }}</span>
          <span>メールアドレス</span>
        </div>
        <!-- <md-button
          class="md-icon-button"
          @click="onEditItemClick('メールアドレス', $store.getters['getLoginUser'].mailAddress)"
        >
          <md-icon>edit</md-icon>
        </md-button>-->
      </md-list-item>
      <md-divider></md-divider>
    </md-list>
    <Snackbar ref="snackbar" :message="'更新しました'" />
  </div>
</template>

<script>
import _ from "lodash";
import Snackbar from "@/components/atoms/Snackbar";
import ProfileModification from "@/components/organisms/ProfileModification";
export default {
  data() {
    return {
      content: "",
      title: ""
    };
  },
  methods: {
    onEditItemClick(title, content) {
      this.content = content;
      this.title = title;
      this.$refs.dialog.openDialog();
    },
    goPhotoModification() {
      this.$router.push({
        name: "photoModification"
      });
    },
    updateSuccess() {
      this.$refs.snackbar.openSnackbar();
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
  mounted() {
    if (this.$route.params.updateSuccessFlg !== undefined) {
      this.updateSuccess();
    }
  },
  created() {},
  components: {
    ProfileModification,
    Snackbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.picture-title {
  color: rgba(0, 0, 0, 0.54);
}
</style>
