<template>
  <div>
    <component :is="currentComponentNm" @success-send-mail="successSendMail"></component>
  </div>
</template>

<script>
import ForgotPassword from "@/components/organisms/ForgotPassword";
import SendResetPasswordMail from "@/components/organisms/SendResetPasswordMail";
export default {
  data() {
    return {
      currentComponentNm: "ForgotPassword"
    };
  },
  methods: {
    successSendMail() {
      this.currentComponentNm = "SendResetPasswordMail";
    }
  },
  watch: {},
  computed: {},
  created() {},
  components: {
    ForgotPassword,
    SendResetPasswordMail
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
