<template>
  <md-speed-dial md-event="click" class="md-bottom-right" md-direction="top">
    <md-speed-dial-target class="md-primary">
      <md-icon>my_location</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>
      <md-button class="md-icon-button">
        <md-icon>directions</md-icon>
      </md-button>

      <md-button class="md-icon-button">
        <md-icon>streetview</md-icon>
      </md-button>
    </md-speed-dial-content>
  </md-speed-dial>
</template>

<script>
export default {
  data: () => ({
    // noError: null,
    // required: null,
    // textarea: null,
    // hasMessages: true
  }),
  computed: {
    messageClass() {
      return {
        // "md-invalid": this.hasMessages
      };
    }
  },
  props: {
    // inline: { type: String, default: null },
    // icon: { type: String, default: null }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
