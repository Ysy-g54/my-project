<template>
  <div>
    <h2>書き留め一覧</h2>
    <div>
      <MemoCard/>
    </div>
    <SpeedDial/>
  </div>
</template>

<script>
import MemoCard from "@/components/molecules/MemoCard";
import SpeedDial from "@/components/molecules/SpeedDial";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {
    MemoCard,
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
