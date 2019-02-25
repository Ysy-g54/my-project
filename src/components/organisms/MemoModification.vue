<template>
  <div>
    <div class="md-layout-item">
      <md-field>
        <label for="categoryId">カテゴリ</label>
        <md-select v-model="categoryId" name="categoryId">
          <md-option value="1">目標</md-option>
          <md-option value="2">メモ</md-option>
          <md-option value="3">その他</md-option>
        </md-select>
      </md-field>
    </div>
    <md-field>
      <label>アクション・メモ</label>
      <md-textarea v-model="memo"></md-textarea>
    </md-field>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
export default {
  data() {
    return {
      categoryId: "",
      memo: "",
      database: firebase.firestore(),
      isUpdateMemo: false,
      memoId: "",
      insertDateTime: new Date()
    };
  },
  methods: {
    saveMemo() {
      (!this.isUpdateMemo
        ? this.database.collection("memo").add({
            categoryId: this.categoryId,
            memo: this.memo,
            insertDateTime: this.insertDateTime,
            userId: "user1",
            deleteFlg: false
          })
        : this.database
            .collection("memo")
            .doc(this.memoId)
            .set({
              categoryId: this.categoryId,
              memo: this.memo,
              insertDateTime: this.insertDateTime,
              userId: "user1",
              deleteFlg: false
            })
      )
        .then(docRef => {
          this.$router.push({
            name: "Memo",
            params: { saveSuccessFlg: true }
          });
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    }
  },
  watch: {
    isSavable() {
      this.saveMemo();
    }
  },
  computed: {},
  props: {
    isSavable: { type: Boolean, default: false }
  },
  mounted() {},
  created() {
    if (this.$route.params.memoId !== undefined) {
      this.database
        .collection("memo")
        .doc(this.$route.params.memoId)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.exists) {
            let data = querySnapshot.data();
            this.categoryId = data.categoryId;
            this.memo = data.memo;
            this.memoId = querySnapshot.id;
            this.insertDateTime = data.insertDateTime;
            this.isUpdateMemo = true;
          }
        });
    }
  },
  components: {
    inject: ["$validator"]
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
