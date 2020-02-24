<template>
  <div>
    <md-dialog :md-active.sync="active" :md-fullscreen="false">
      <md-list class="md-double-line">
        <md-list-item
          v-for="shareApp in shareApps"
          :key="shareApp.url"
          @click="shareMemo(shareApp.url)"
        >
          <div class="md-list-item-text picture-title">
            <img class="app-icon" :src="shareApp.img" />
          </div>
          <div class="md-list-item-text">
            <span>{{ shareApp.appNm }}</span>
          </div>
        </md-list-item>
      </md-list>
    </md-dialog>
  </div>
</template>

<script>
import { shareApps } from "../../constants";
export default {
  data: () => ({
    active: false,
    shareApps: shareApps,
    targetMemo: {}
  }),
  props: {},
  watch: {},
  computed: {},
  methods: {
    shareMemo(url) {
      location.href =
        url +
        "作成日%0A" +
        this.formatDate(this.targetMemo.insertDateTime) +
        "%0A%0Aメモ%0A" +
        this.targetMemo.memo;
    },
    openDialog(memo) {
      this.active = true;
      this.targetMemo = memo;
    }
  },
  mounted() {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img.app-icon {
  width: 50%;
}
</style>
