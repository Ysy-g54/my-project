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
h1,
h2 {
  font-weight: normal;
}

#hello {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}
</style>
