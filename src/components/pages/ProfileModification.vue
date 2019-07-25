<template>
  <Header>
    <div slot="header">
      <BackHeader :isShowSaveButton="false" :title="'編集'"></BackHeader>
    </div>
    <div slot="main">
      <ProfileModification></ProfileModification>
    </div>
  </Header>
</template>

<script>
import BackHeader from "@/components/organisms/BackHeader";
import Header from "@/components/pages/Header";
import ProfileModification from "@/components/organisms/ProfileModification";
export default {
  data() {
    return {};
  },
  methods: {},
  props: {},
  created() {},
  components: {
    BackHeader,
    Header,
    ProfileModification
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
