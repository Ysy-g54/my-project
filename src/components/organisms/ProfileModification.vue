<template>
  <div>
    <md-list class="md-double-line">
      <md-list-item>
        <div class="md-list-item-text">
          <span>{{ $store.getters["getLoginUser"].name }}</span>
          <span>名前</span>
        </div>
        <md-icon>edit</md-icon>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
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
