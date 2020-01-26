<template>
  <Header>
    <div slot="header">
      <BackHeader
        :title="'書き留める'"
        :isShowArchiveButton="true"
        @save-success="saveSuccess"
        @archive-success="archiveSuccess"
      ></BackHeader>
    </div>
    <div slot="main">
      <MemoModification
        :isArchive="isArchive"
        :isSavable="isSavable"
        @start-edit="startEdit"
        @end-edit="endEdit"
      ></MemoModification>
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
      isArchive: false,
      isSavable: false
    };
  },
  methods: {
    async saveSuccess() {
      this.isSavable = true;
      this.isEdited = false;
    },
    archiveSuccess() {
      this.isArchive = !this.isArchive;
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
