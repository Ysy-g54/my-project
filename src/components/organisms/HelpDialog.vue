<template>
  <div>
    <md-dialog :md-active.sync="active" @keydown.ctrl.191="closeDialog">
      <md-subheader>ヘルプ</md-subheader>
      <md-list class="md-double-line">
        <md-list-item>
          <div class="md-list-item-text">
            <span>「ctrl」 + 「?」でヘルプを呼び出すことができます。</span>
          </div>
        </md-list-item>
        <md-list-item>
          <div class="md-list-item-text">
            <span>メモを更新する画面にて、「ctrl」 + 「s」で編集中のメモを登録・更新することができます。</span>
          </div>
        </md-list-item>
      </md-list>
    </md-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      video: {},
      canvas: {},
      captures: []
    };
  },
  methods: {
    openDialog() {
      this.active = true;
    },
    closeDialog() {
      this.active = false;
    }
  },
  watch: {},
  computed: {},
  props: {},
  mounted() {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
