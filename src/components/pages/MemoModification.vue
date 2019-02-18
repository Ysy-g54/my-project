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
    return {};
  },
  methods: {
    saveSuccess() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        this.$validator.reset();
        // Get a database reference to our blog
        let db = firebase.firestore();
        db.collection("memo")
          .add({
            memoId: "1",
            categoryId: "1",
            title: "testTitle",
            memo: "testMessage"
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
        this.$router.push({
          name: "Memo",
          params: { saveSuccessFlg: true }
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
