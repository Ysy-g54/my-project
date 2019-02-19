<template>
  <div>
    <md-field :class="isErrorField" md-clearable>
      <label>タイトル</label>
      <md-input v-model="title" v-validate="'max:255'" data-vv-as="title" name="titleField"></md-input>
      <span class="md-error">{{ errors.first('titleField') }}</span>
    </md-field>
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
      title: "",
      categoryId: "",
      memo: "",
      database: firebase.firestore(),
      isUpdateMemo: false,
      memoId: ""
    };
  },
  methods: {
    saveMemo() {
      if (!this.isUpdateMemo) {
        this.database
          .collection("memo")
          .add({
            title: this.title,
            categoryId: this.categoryId,
            memo: this.memo,
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
      } else {
        this.database
          .collection("memo")
          .doc(this.memoId)
          .set({
            title: this.title,
            categoryId: this.categoryId,
            memo: this.memo,
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
      }
    }
  },
  watch: {
    isSavable() {
      this.saveMemo();
    }
  },
  computed: {
    isErrorField() {
      return {
        "md-invalid": this.errors.has("titleField")
      };
    }
  },
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
            this.title = data.title;
            this.categoryId = data.categoryId;
            this.memo = data.memo;
            this.memoId = querySnapshot.id;
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
