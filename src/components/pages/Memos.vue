<template>
  <div>
    <Memos />
  </div>
</template>

<script>
import Memos from "@/components/organisms/Memos";
import userSettingService from "@/service/user-setting-service";
export default {
  data() {
    return {};
  },
  methods: {},
  watch: {},
  props: {},
  computed: {},
  async created() {
    if (
      this.$store.getters["getLoginUser"].providerId === "google.com" &&
      this.$store.getters["getLoginUser"].memoDisplayForm === ""
    ) {
      let userSetting = {
        userId: this.$store.getters["getLoginUser"].uid,
        memoDisplayForm: "0"
      };
      await userSettingService.register(userSetting);
    }
  },
  components: {
    Memos
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
