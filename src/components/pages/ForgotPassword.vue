<template>
  <div>
    <component :is="currentComponentNm" @success-send-mail="successSendMail"></component>
  </div>
</template>

<script>
import ForgotPassword from "@/components/organisms/ForgotPassword";
import ResetPasswordMailSent from "@/components/organisms/ResetPasswordMailSent";
export default {
  data() {
    return {
      currentComponentNm: "ForgotPassword"
    };
  },
  methods: {
    successSendMail() {
      this.currentComponentNm = "ResetPasswordMailSent";
    }
  },
  watch: {},
  computed: {},
  created() {},
  components: {
    ForgotPassword,
    ResetPasswordMailSent
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
