<template>
  <div>
    <md-field>
      <label>問題点やご意見を書いてください。</label>
      <md-textarea v-autofocus v-model="text" rows="10"></md-textarea>
    </md-field>
    <div class="md-layout md-alignment-top-right">
      <md-button class="md-dense md-raised md-primary" @click="sendMail">送信する</md-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    async sendMail() {
      const sendFeedbackMail = firebase
        .firestore()
        .httpsCallable("sendFeedbackMail");
      await sendFeedbackMail({ text: this.text });
    }
  },
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-field.md-has-textarea:not(.md-autogrow):after,
.md-field.md-has-textarea:not(.md-autogrow):before {
  border: hidden;
}

.md-field.md-has-textarea:not(.md-autogrow) .md-textarea {
  min-height: 300px;
}
</style>
