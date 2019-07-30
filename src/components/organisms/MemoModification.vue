<template>
  <div>
    <md-field>
      <label>メモ内容</label>
      <md-textarea v-autofocus v-model="memo"></md-textarea>
    </md-field>
    <div v-for="file in files" :key="file.id">
      <md-button class="md-icon-button" @click="$refs.upload.remove(file)">
        <md-icon>highlight_off</md-icon>
      </md-button>
      <img v-for="file in files" :key="file.id" :src="file.thumb" width="auto" height="auto" />
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
import _ from "lodash";
import firebase from "firebase";
import fileUpload from "vue-upload-component";
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
      doneFlg: false,
      fileUrl: null,
      files: []
    };
  },
  methods: {
    onFavoriteChange() {
      this.favoriteFlg = !this.favoriteFlg;
    },
    saveMemo() {
      if (!_.isEmpty(this.files)) {
        this.uploadFile();
      }
      let userId = this.$store.getters["getLoginUser"].uid;
      (!this.isUpdateMemo
        ? this.database.collection("memo").add({
            categoryId: this.categoryId,
            memo: this.memo,
            insertDateTime: firebase.firestore.FieldValue.serverTimestamp(),
            userId: userId,
            favoriteFlg: this.favoriteFlg,
            deleteFlg: false,
            doneFlg: false,
            fileUrl: this.fileUrl
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
              doneFlg: false,
              fileUrl: this.fileUrl
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
    uploadFile() {
      let storageRef = firebase.storage().ref();
      let uploadRef = storageRef.child(this.files[0].name);
      uploadRef.put(this.files[0].file).then(uploadResult => {
        storageRef
          .child(`${uploadResult.metadata.fullPath}`)
          .getDownloadURL()
          .then(result => {
            this.fileUrl = result;
            this.database.collection("file").add({
              file: this.files[0].file,
              name: this.files[0].name
            });
          });
      });
    },
    getFile() {
      if (this.fileUrl !== null) {
        this.files.thumb = this.fileUrl;
      }
    },
    /**
     * Has changed
     * @param  Object|undefined   newFile   Read only
     * @param  Object|undefined   oldFile   Read only
     */
    inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (
            newFile.size >= 0 &&
            this.minSize > 0 &&
            newFile.size < this.minSize
          ) {
            this.$refs.upload.update(newFile, { error: "size" });
          }
        }
      }
      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
        }
      }
      // Automatically activate upload
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   Read and write
     * @param  Object|undefined   oldFile   Read only
     * @param  Function           prevent   Prevent changing
     */
    inputFilter(newFile, oldFile, prevent) {
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
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        newFile.blob = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file);
        }
        // Thumbnails
        newFile.thumb = "";
        if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
          newFile.thumb = newFile.blob;
        }
      }
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
            this.fileUrl = data.fileUrl;
            this.getFile();
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
