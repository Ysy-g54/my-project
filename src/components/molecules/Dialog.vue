<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      :md-content="content"
      md-confirm-text="OK"
      md-cancel-text="キャンセル"
      @md-cancel="onCancelClick"
      @md-confirm="onConfirmClick"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false,
    content: "defaultMessage"
  }),
  props: {
    isActive: { type: Boolean, default: false }
  },
  watch: {
    isActive() {
      this.active = this.isActive;
    }
  },
  computed: {},
  methods: {
    onConfirmClick() {
      this.$emit("confirm-dialog");
    },
    onCancelClick() {
      this.active = false;
    }
  },
  mounted() {
    if (this.isActive) {
      this.active = true;
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
