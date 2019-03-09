<template>
  <Header>
    <div slot="header">
      <BackHeader :title="'アカウントを作成'" @save-success="saveSuccess"></BackHeader>
    </div>
    <div slot="main"></div>
  </Header>
</template>

<script>
import BackHeader from "@/components/organisms/BackHeader";
export default {
  data() {
    return {
      mailAddress: "",
      password: "",
      message: "",
      duration: 10000
    };
  },
  methods: {
    saveSuccess() {
      this.$router.push({
        name: "login"
      });
    }
  },
  watch: {},
  computed: {},
  created() {},
  components: {
    BackHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
