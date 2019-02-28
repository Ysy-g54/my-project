<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      :md-content="content"
      md-confirm-text="OK"
      md-cancel-text="キャンセル"
      @md-confirm="onConfirmClick"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false
  }),
  props: {
    content: { type: String, default: "" }
  },
  watch: {
    message() {
      this.content = this.message;
    }
  },
  computed: {},
  methods: {
    onConfirmClick() {
      this.$emit("confirm-dialog");
    },
    openDialog() {
      this.active = true;
    }
  },
  mounted() {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
