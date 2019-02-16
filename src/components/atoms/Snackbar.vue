<template>
  <md-snackbar
    :md-position="position"
    :md-active.sync="isOpen"
    :md-duration="duration"
    md-persistent
  >
    <span>{{message}}</span>
    <md-button v-if="isButton" class="md-primary" @click="isOpen = false">{{button}}</md-button>
  </md-snackbar>
</template>

<script>
export default {
  data: () => ({
    isOpen: false,
    position: "center"
  }),
  methods: {
    // FIXME v-model使う
    openSnackbar() {
      this.isOpen = true;
    }
  },
  watch: {},
  computed: {
    isButton() {
      return this.button !== "";
    }
  },
  props: {
    isOpenSnackbar: { type: Boolean, default: false },
    message: { type: String, default: "RETRY" },
    button: { type: String, required: false },
    duration: { type: Number, default: 4000, required: false }
  },
  mounted() {
    if (this.isOpenSnackbar) {
      this.openSnackbar();
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
