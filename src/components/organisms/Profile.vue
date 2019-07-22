<template>
  <div>
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
        <md-icon>chevron_right</md-icon>
      </md-list-item>
      <md-divider></md-divider>
      <md-list-item>
        <div class="md-list-item-text">
          <span>{{ $store.getters["getLoginUser"].name }}</span>
          <span>名前</span>
        </div>
        <md-icon>chevron_right</md-icon>
      </md-list-item>
      <md-divider></md-divider>
      <md-list-item>
        <div class="md-list-item-text">
          <span>{{ $store.getters["getLoginUser"].mailAddress }}</span>
          <span>メールアドレス</span>
        </div>
        <md-icon>chevron_right</md-icon>
      </md-list-item>
      <md-divider></md-divider>
    </md-list>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    isNotEmptyLoginUserPhoto() {
      return !_.isEmpty(this.loginUserPhoto);
    },
    loginUserPhoto() {
      return this.$store.getters["getLoginUser"].photoUrl;
    }
  },
  mounted() {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.picture-title {
  color: rgba(0, 0, 0, 0.54);
}
</style>
