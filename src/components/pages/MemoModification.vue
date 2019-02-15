<template>
  <Header>
    <div slot="header">
      <BackHeader @save-success="saveSuccess"></BackHeader>
    </div>
    <div slot="main">
      <MemoModification></MemoModification>
    </div>
  </Header>
</template>

<script>
import BackHeader from "@/components/organisms/BackHeader";
import MemoModification from "@/components/organisms/MemoModification";
import Header from "@/components/pages/Header";
export default {
  data() {
    return {};
  },
  methods: {
    saveSuccess() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        this.$validator.reset();
        this.$router.push({
          name: "Memo",
          params: { saveSuccessFlg: true }
        });
      });
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
