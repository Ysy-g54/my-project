<template>
  <md-field :class="messageClass" md-inline>
    <label>{{ inline }}</label>
    <md-input v-model="required" required></md-input>
  </md-field>
</template>

<script>
export default {
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
</style>
