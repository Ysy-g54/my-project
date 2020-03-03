<template>
  <div @keydown.ctrl.83="saveByKeyDown">
    <md-field>
      <label>メモ内容</label>
      <md-textarea v-autofocus v-model="memo" rows="10"></md-textarea>
    </md-field>
    <div v-for="file in files" :key="file.id">
      <md-button class="md-icon-button" @click="$refs.upload.remove(file)">
        <md-icon>highlight_off</md-icon>
      </md-button>
      <img v-for="file in files" :key="file.id" :src="file.thumb" width="auto" height="auto" />
    </div>
    <div v-if="memoId !== null && fileUrl !== null">
      <md-button class="md-icon-button" @click="removeFile()">
        <md-icon>highlight_off</md-icon>
      </md-button>
      <img :src="fileUrl" width="auto" height="auto" />
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
    <Snackbar ref="snackbar" :message="snackbarMessage"></Snackbar>
  </div>
</template>

<script>
import _ from "lodash";
import actionHistoryService from "@/service/action-history-service";
import memoService from "@/service/memo-service";
import firebase from "firebase";
import fileUpload from "vue-upload-component";
import Snackbar from "@/components/atoms/Snackbar";
import { categories, actionTypes, dataTypes } from "../../constants";
import "firebase/firestore";
export default {
  data() {
    return {
      categoryId: "",
      memo: "",
      database: firebase.firestore(),
      isUpdateMemo: false,
      memoId: null,
      insertDateTime: null,
      categories: categories,
      favoriteFlg: false,
      doneFlg: false,
      fileUrl: null,
      fileReference: null,
      files: [],
      snackbarMessage: ""
    };
  },
  methods: {
    async saveByKeyDown() {
      await event.preventDefault();
      await this.modifyMemo();
    },
    async modifyMemo() {
      await this.$emit("end-edit");
      await this.saveMemo();
      this.files = [];
      await this.registerActionHistory(this.memoId, actionTypes[1].actionType);
      await this.searchMemoByMemoId(this.memoId);
      this.snackbarMessage = "書き留めました。";
      this.$refs.snackbar.openSnackbar();
    },
    onFavoriteChange() {
      this.favoriteFlg = !this.favoriteFlg;
    },
    async saveMemo() {
      await this.deleteFile();
      await this.uploadFile();
      let memo = {};
      memo.categoryId = this.categoryId;
      memo.memo = this.memo;
      memo.insertDateTime =
        this.insertDateTime !== null
          ? this.insertDateTime
          : firebase.firestore.FieldValue.serverTimestamp();
      memo.userId = this.$store.getters["getLoginUser"].uid;
      memo.favoriteFlg = this.favoriteFlg;
      memo.deleteFlg = false;
      memo.doneFlg = false;
      memo.fileUrl = this.fileUrl;
      memo.fileReference = this.fileReference;

      let saveData = await (!this.isUpdateMemo
        ? memoService.register(memo)
        : memoService.modify(memo, this.memoId));

      if (this.memoId === null) {
        this.isUpdateMemo = true;
        this.memoId = saveData.id;
      }
    },
    async registerActionHistory(memoId, actionType) {
      let actionHistory = {};
      actionHistory.actionType = actionType;
      actionHistory.dataType = dataTypes[0].dataType;
      actionHistory.memoId = memoId;
      actionHistory.actionDateTime = firebase.firestore.FieldValue.serverTimestamp();
      actionHistory.userId = this.$store.getters["getLoginUser"].uid;
      await actionHistoryService.register(actionHistory);
    },
    goMemos() {
      this.$router.push({
        name: "memos",
        params: { saveSuccessFlg: true }
      });
    },
    async deleteFile() {
      if (this.fileReference !== null && this.fileUrl === null) {
        let storageRef = firebase.storage().ref();
        let deleteFileRef = storageRef.child(this.fileReference);
        await deleteFileRef.delete();
        this.fileReference = null;
      }
    },
    async uploadFile() {
      if (!_.isEmpty(this.files)) {
        let storageRef = firebase.storage().ref();
        let uploadRef = storageRef.child(
          this.files[0].id + "-" + this.files[0].name
        );
        let uploadResult = await uploadRef.put(this.files[0].file);
        let result = await storageRef
          .child(`${uploadResult.metadata.fullPath}`)
          .getDownloadURL();
        this.fileUrl = result;
        this.fileReference = this.files[0].id + "-" + this.files[0].name;
      }
    },
    removeFile() {
      this.fileUrl = null;
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
      // 登録済みの画像の×ボタンをクリックせずに画像をアップロードすると2つ画面に出てしまうため、
      // メモが登録済みかつ既にファイルが登録済みの場合にファイルURLをnullにします。
      // TODO 画像を2つ画面に出さないようにするための考慮は別で作って判断すべきなのでそうする。
      if (this.memoId !== null && this.fileUrl !== null) {
        this.fileUrl = null;
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
    },
    async searchMemoByMemoId(memoId) {
      let memo = await memoService.searchByMemoId(memoId);
      if (memo.exists) {
        let data = memo.data();
        _.set(data, "memoId", memo.id);
        this.setMemoData(data);
      } else {
        this.snackbarMessage =
          "更新するメモがないため、新規メモを表示しています。";
        this.$refs.snackbar.openSnackbar();
      }
    },
    setMemoData(data) {
      this.categoryId = data.categoryId;
      this.memo = data.memo;
      this.memoId = data.memoId;
      this.insertDateTime = data.insertDateTime;
      this.favoriteFlg = data.favoriteFlg;
      this.doneFlg = data.doneFlg;
      this.isUpdateMemo = true;
      this.fileUrl = data.fileUrl;
      this.fileReference = data.fileReference;
    },
    setFile(file) {
      console.error(file);
      this.files = [];
      this.files = file;
    }
  },
  watch: {
    async isSavable() {
      await this.saveMemo();
      await this.registerActionHistory(this.memoId, actionTypes[0].actionType);
      await this.goMemos();
    },
    async isArchive() {
      await this.modifyMemo();
    }
  },
  computed: {},
  props: {
    isArchive: { type: Boolean, default: false },
    isSavable: { type: Boolean, default: false }
  },
  mounted() {},
  async created() {
    if (this.$route.params.memoId !== undefined) {
      await this.searchMemoByMemoId(this.$route.params.memoId);
    }
    await this.$watch(
      // 4つのプロパティを含めた値を評価させる
      () => [
        this.$data.categoryId,
        this.$data.memo,
        this.$data.favoriteFlg,
        this.$data.doneFlg
      ],
      () => {
        this.$emit("start-edit");
      }
    );
  },
  components: {
    fileUpload,
    Snackbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-field.md-has-textarea:not(.md-autogrow):after,
.md-field.md-has-textarea:not(.md-autogrow):before {
  border: hidden;
}

.md-field.md-has-textarea:not(.md-autogrow) .md-textarea {
  min-height: 400px;
}
</style>
