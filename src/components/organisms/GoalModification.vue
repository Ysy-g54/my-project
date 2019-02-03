<template>
  <div>
    <Card/>
  </div>
</template>

<script>
import Card from "@/components/molecules/Card";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {
    Card
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
