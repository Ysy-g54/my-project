<template>
  <Header>
    <div slot="header">
      <BackHeader :title="'書き留める'" @save-success="saveSuccess"></BackHeader>
    </div>
    <div slot="main">
      <MemoModification :isSavable="isSavable"></MemoModification>
    </div>
  </Header>
</template>

<script>
import BackHeader from "@/components/organisms/BackHeader";
import MemoModification from "@/components/organisms/MemoModification";
import Header from "@/components/pages/Header";
export default {
  data() {
    return {
      isSavable: false
    };
  },
  methods: {
    saveSuccess() {
      this.isSavable = true;
    }
  },
  created() {},
  components: {
    BackHeader,
    MemoModification,
    Header
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
