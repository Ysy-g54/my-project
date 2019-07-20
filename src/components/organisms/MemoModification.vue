<template>
  <div>
    <md-field>
      <label>アクション・メモ</label>
      <md-textarea v-model="memo"></md-textarea>
    </md-field>
    <div class="md-layout-item">
      <md-field>
        <label for="categoryId">カテゴリ</label>
        <md-select v-model="categoryId" name="categoryId">
          <md-option
            v-for="(category, index) in categories"
            :key="index"
            :value="category.categoryId"
          >{{ category.categoryNm }}</md-option>
        </md-select>
      </md-field>
    </div>
    <span class="body-2">お気に入り</span>
    <md-button
      class="md-icon-button"
      :class="{ 'md-primary': favoriteFlg }"
      @click="onFavoriteChange"
    >
      <md-icon v-if="favoriteFlg">star</md-icon>
      <md-icon v-else>star_border</md-icon>
    </md-button>
  </div>
</template>

<script>
import firebase from "firebase";
import { categories } from "../../constants";
import "firebase/firestore";
export default {
  data() {
    return {
      categoryId: "",
      memo: "",
      database: firebase.firestore(),
      isUpdateMemo: false,
      memoId: "",
      insertDateTime: null,
      categories: categories,
      favoriteFlg: false,
      doneFlg: false
    };
  },
  methods: {
    onFavoriteChange() {
      this.favoriteFlg = !this.favoriteFlg;
    },
    saveMemo() {
      let userId = this.$store.getters["getLoginUser"].uid;
      (!this.isUpdateMemo
        ? this.database.collection("memo").add({
            categoryId: this.categoryId,
            memo: this.memo,
            insertDateTime: firebase.firestore.FieldValue.serverTimestamp(),
            userId: userId,
            favoriteFlg: this.favoriteFlg,
            deleteFlg: false,
            doneFlg: false
          })
        : this.database
            .collection("memo")
            .doc(this.memoId)
            .set({
              categoryId: this.categoryId,
              memo: this.memo,
              insertDateTime: this.insertDateTime,
              userId: userId,
              favoriteFlg: this.favoriteFlg,
              deleteFlg: false,
              doneFlg: false
            })
      )
        .then(docRef => {
          this.$router.push({
            name: "memoHistory",
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
            this.favoriteFlg = data.favoriteFlg;
            this.doneFlg = data.doneFlg;
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
</style>
