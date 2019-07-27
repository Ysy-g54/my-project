<template>
  <div>
    <md-field>
      <label>メモ内容</label>
      <md-textarea v-autofocus v-model="memo"></md-textarea>
    </md-field>
    <div v-show="isShowFile">
      <img v-for="file in files" :key="file.id" :src="file.thumb" width="40" height="auto" />
    </div>
    <md-button class="md-icon-button">
      <fileUpload
        ref="upload"
        v-model="files"
        post-action="/post.method"
        put-action="/put.method"
        @input-file="inputFile"
        @input-filter="inputFilter"
      >
        <md-icon>insert_photo</md-icon>
      </fileUpload>
    </md-button>
    <md-button
      class="md-icon-button"
      :class="{ 'md-primary': favoriteFlg }"
      @click="onFavoriteChange"
    >
      <md-icon v-if="favoriteFlg">star</md-icon>
      <md-icon v-else>star_border</md-icon>
    </md-button>
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
  </div>
</template>

<script>
import firebase from "firebase";
import fileUpload from "vue-upload-component";
// import ImageCompressor from "@xkeshi/image-compressor";
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
      files: [],
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
    },
    /**
     * Has changed
     * @param  Object|undefined   newFile   Read only
     * @param  Object|undefined   oldFile   Read only
     * @return undefined
     */
    inputFile: function(newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log("response", newFile.response);
        if (newFile.xhr) {
          //  Get the response status code
          console.log("status", newFile.xhr.status);
        }
      }
      newFile.thumb = "";
      if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
        newFile.thumb = newFile.blob;
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   Read and write
     * @param  Object|undefined   oldFile   Read only
     * @param  Function           prevent   Prevent changing
     * @return undefined
     */
    inputFilter: function(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // Filter system files or hide files
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }
        // Filter php html js file
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
        // // Automatic compression
        // if (
        //   newFile.file &&
        //   newFile.type.substr(0, 6) === "image/" &&
        //   this.autoCompress > 0 &&
        //   this.autoCompress < newFile.size
        // ) {
        //   newFile.error = "compressing";
        //   const imageCompressor = new ImageCompressor(null, {
        //     convertSize: Infinity,
        //     maxWidth: 512,
        //     maxHeight: 512
        //   });
        //   imageCompressor
        //     .compress(newFile.file)
        //     .then(file => {
        //       this.$refs.upload.update(newFile, {
        //         error: "",
        //         file,
        //         size: file.size,
        //         type: file.type
        //       });
        //     })
        //     .catch(err => {
        //       this.$refs.upload.update(newFile, {
        //         error: err.message || "compress"
        //       });
        //     });
        // }
      }

      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        newFile.blob = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file);
        }
      }
    }
  },
  watch: {
    isSavable() {
      this.saveMemo();
    }
  },
  computed: {
    isShowFile() {
      return this.files.length !== 0;
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
    fileUpload
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-field.md-has-textarea:not(.md-autogrow):after,
.md-field.md-has-textarea:not(.md-autogrow):before {
  border: hidden;
}
</style>
