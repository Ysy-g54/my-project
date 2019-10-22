<template>
  <Header>
    <div slot="header">
      <BackHeader :title="'写真を編集'" @save-success="saveSuccess"></BackHeader>
    </div>
    <div slot="main">
      <PhotoModification :isSavable="isSavable"></PhotoModification>
    </div>
  </Header>
</template>

<script>
import BackHeader from "@/components/organisms/BackHeader";
import PhotoModification from "@/components/organisms/PhotoModification";
import Header from "@/components/pages/Header";
export default {
  data() {
    return {
      isSavable: false
    };
  },
  methods: {
    saveSuccess() {
      this.isSavable = !this.isSavable;
    }
  },
  created() {},
  components: {
    BackHeader,
    PhotoModification,
    Header
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
