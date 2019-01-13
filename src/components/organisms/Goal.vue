<template>
  <div>
    <h1>目標</h1>
    <Card :goals="goals"/>
    <SpeedDial/>
  </div>
</template>

<script>
import Card from "@/components/molecules/Card";
import SpeedDial from "@/components/molecules/SpeedDial";
export default {
  data() {
    return {
      goals: [{ title: "test" }, { title: "test2" }]
    };
  },
  methods: {},
  created() {},
  components: {
    Card,
    SpeedDial
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
