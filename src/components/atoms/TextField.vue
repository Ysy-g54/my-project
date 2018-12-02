<template>
  <md-field :class="messageClass" md-inline>
    <label>{{ inline }}</label>
    <md-input v-model="required" required></md-input>
    <md-icon v-if="icon !== null" class="search"></md-icon>
  </md-field>
</template>

<script>
export default {
  name: "TextField",
  data: () => ({
    noError: null,
    required: null,
    textarea: null,
    hasMessages: true
  }),
  computed: {
    messageClass() {
      return {
        "md-invalid": this.hasMessages
      };
    }
  },
  props: {
    inline: { type: String, default: null },
    icon: { type: String, default: null }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  background: url("../../../static/img/icons/search.png");
  background-size: cover;
}
</style>
