<template>
  <Header>
    <div slot="main">
      <Goal></Goal>
    </div>
  </Header>
</template>

<script>
import Header from "@/components/pages/Header";
import Goal from "@/components/organisms/Goal";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {
    Header,
    Goal
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
