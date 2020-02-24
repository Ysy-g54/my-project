<template>
  <div>
    <md-dialog :md-active.sync="active" :md-fullscreen="false" @keydown.ctrl.191="closeDialog">
      <md-subheader>ヘルプ</md-subheader>
      <div>
        <md-icon>list_alt</md-icon>
        <span>「ctrl」 + 「?」でヘルプを呼び出すことができます。</span>
      </div>
      <md-divider></md-divider>
      <div>
        <md-icon>list_alt</md-icon>
        <span>メモを更新する画面にて、「ctrl」 + 「s」で編集中のメモを登録・更新することができます。</span>
      </div>
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
