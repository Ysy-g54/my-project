<template>
  <Header>
    <div slot="header">
      <md-button class="md-icon-button" @click="back">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="save">
        <md-icon>send</md-icon>
      </md-button>
    </div>
    <div slot="main">
      <GoalModification></GoalModification>
    </div>
  </Header>
</template>

<script>
import GoalModification from "@/components/organisms/GoalModification";
import Header from "@/components/pages/Header";
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.back();
    },
    save() {}
  },
  created() {},
  components: {
    GoalModification,
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
