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
import firebase from "firebase";
import "firebase/firestore";
import BackHeader from "@/components/organisms/BackHeader";
import MemoModification from "@/components/organisms/MemoModification";
import Header from "@/components/pages/Header";
export default {
  data() {
    return {
      database: firebase.firestore()
    };
  },
  methods: {
    saveSuccess() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        this.$validator.reset();
        this.database
          .collection("memo")
          .add({
            categoryId: "1",
            title: "testTitle",
            memo: "testMessage",
            userId: "user1",
            deleteFlg: false
          })
          .then(docRef => {
            this.$router.push({
              name: "Memo",
              params: { saveSuccessFlg: true }
            });
          })
          .catch(error => {
            console.error("Error adding document: ", error);
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
