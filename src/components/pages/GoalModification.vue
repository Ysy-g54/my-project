<template>
  <Header>
    <div slot="header">
      <BackHeader @save-success="saveSuccess"></BackHeader>
    </div>
    <div slot="main">
      <GoalModification></GoalModification>
    </div>
  </Header>
</template>

<script>
import BackHeader from "@/components/organisms/BackHeader";
import GoalModification from "@/components/organisms/GoalModification";
import Header from "@/components/pages/Header";
export default {
  data() {
    return {};
  },
  methods: {
    saveSuccess() {
      this.$validator.validateAll().then(result => {
        if (result) {
          return;
        }
        this.$validator.reset();
        this.$router.push({
          name: "Goal",
          params: { saveSuccessFlg: true }
        });
      });
    }
  },
  created() {},
  components: {
    BackHeader,
    GoalModification,
    Header
  },
  inject: {
    $validator: "$validator"
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
