<template>
  <div>
    <Card :goals="goals"/>
  </div>
</template>

<script>
import Card from "@/components/molecules/Card";
export default {
  data() {
    return {
      goals: [
        { title: "test", insertDateTime: "2018/01/13" },
        { title: "test2", insertDateTime: "2018/01/14" },
        { title: "test2", insertDateTime: "2018/01/14" }
      ]
    };
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
