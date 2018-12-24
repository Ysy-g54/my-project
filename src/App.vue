<template>
  <div id="app">
    <md-app>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
export default {
  name: "App",
  methods: {},
  components: {}
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
