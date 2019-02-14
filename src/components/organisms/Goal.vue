<template>
  <div>
    <h2>書き留め一覧</h2>
    <div v-for="(goal, index) in goals" :key="index">
      <Card :goal="goals[index]"/>
    </div>
    <SpeedDial/>
  </div>
</template>

<script>
import Card from "@/components/molecules/Card";
import SpeedDial from "@/components/molecules/SpeedDial";
export default {
  data() {
    return {
      goals: [
        { title: "test", insertDateTime: "2018/01/13" },
        { title: "test2", insertDateTime: "2018/01/14" },
        { title: "test3", insertDateTime: "2018/01/15" },
        { title: "test3", insertDateTime: "2018/01/15" }
      ]
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
