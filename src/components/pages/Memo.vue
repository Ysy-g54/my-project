<template>
  <Header>
    <div slot="main">
      <Memo></Memo>
    </div>
  </Header>
</template>

<script>
import Memo from "@/components/organisms/Memo";
import Header from "@/components/pages/Header";
export default {
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {},
  created() {},
  components: {
    Memo,
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
