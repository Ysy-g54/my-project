<template>
  <md-field :class="messageClass">
    <label>Required Field</label>
    <md-input v-model="required" required></md-input>
    <span class="md-error">There is an error</span>
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
