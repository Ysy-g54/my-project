<template>
  <div>
    <div>
      <md-avatar class="md-avatar-icon md-large">
        <img
          v-if="isNotEmptyLoginUserPhoto"
          :src="$store.getters['getLoginUser'].photoUrl"
          alt="Avatar"
        />
        <md-icon v-else>account_circle</md-icon>
      </md-avatar>
    </div>
    <input
      type="file"
      name="image"
      accept="image/*"
      style="font-size: 1.2em; padding: 10px 0;"
      @change="setImage"
    />
    <VueCropper
      ref="cropper"
      :guides="true"
      :view-mode="0"
      drag-mode="crop"
      :auto-crop-area="0.5"
      :min-container-width="250"
      :min-container-height="180"
      :background="true"
      :rotatable="true"
      :src="imgSrc"
      alt="選択した写真が表示されます。"
      :img-style="{ width: '400px', height: '300px' }"
    ></VueCropper>
    <img :src="cropImg" alt="トリミングした写真が表示されます。" />
    <br />

    <div v-if="imgSrc != ''">
      <md-button @click="cropImage">
        <md-icon>rate_review</md-icon>
      </md-button>
      <md-button @click="rotateRight">
        <md-icon>rotate_right</md-icon>
      </md-button>
      <md-button @click="rotateLeft">
        <md-icon>rotate_left</md-icon>
      </md-button>
      <md-button @click="zoomIn">
        <md-icon>zoom_in</md-icon>
      </md-button>
      <md-button @click="zoomOut">
        <md-icon>zoom_out</md-icon>
      </md-button>
    </div>
    <Snackbar ref="snackbar" :message="'写真の更新に失敗しました。ファイルが画像の形式かご確認ください。'" />
  </div>
</template>

<script>
import _ from "lodash";
import firebase from "firebase";
import "firebase/firestore";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import Snackbar from "@/components/atoms/Snackbar";
export default {
  data() {
    return {
      database: firebase.firestore(),
      files: [],
      imgSrc: "",
      cropImg: "",
      resultUrl: null,
      photoFileIsValid: true
    };
  },
  methods: {
    setImage(e) {
      const file = e.target.files[0];
      this.files[0] = file;

      if (!file.type.includes("image/")) {
        this.photoFileIsValid = false;
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    rotateRight() {
      // guess what this does :)
      this.$refs.cropper.rotate(90);
    },
    rotateLeft() {
      // guess what this does :)
      this.$refs.cropper.rotate(-90);
    },
    zoomIn() {
      this.$refs.cropper.relativeZoom(0.1);
    },
    zoomOut() {
      this.$refs.cropper.relativeZoom(-0.1);
    },
    async deleteFile() {
      if (this.$store.getters["getLoginUser"].photoUrl !== null) {
        let storageRef = firebase.storage().ref();
        let deleteFileRef = storageRef.child(
          this.$store.getters["getLoginUser"].photoReference
        );
        await deleteFileRef.delete();
      }
    },
    async uploadFile() {
      if (this.files[0].type.includes("image/")) {
        let photoReference =
          this.$store.getters["getLoginUser"].uid +
          "-icon-" +
          this.files[0].name;

        await this.database
          .collection("userSetting")
          .doc(this.$store.getters["getLoginUser"].userSettingId)
          .update({
            photoReference: photoReference
          });

        let storageRef = firebase.storage().ref();
        let uploadRef = storageRef.child(photoReference);
        let uploadResult = await uploadRef.put(this.files[0]);
        this.resultUrl = await storageRef
          .child(`${uploadResult.metadata.fullPath}`)
          .getDownloadURL();
        return true;
      } else {
        return false;
      }
    },
    async updateItem() {
      if (!this.photoFileIsValid) {
        this.$refs.snackbar.openSnackbar();
        return;
      }
      await this.deleteFile();
      let isUploadFile = await this.uploadFile();
      if (isUploadFile) {
        let currentUser = await firebase.auth().currentUser;
        await currentUser.updateProfile({
          displayName: this.$store.getters["getLoginUser"].displayName,
          photoURL: !_.isEmpty(this.files)
            ? this.resultUrl
            : this.$store.getters["getLoginUser"].photoURL
        });
        await this.$store.dispatch("findLoginUser");
        this.$router.push({
          name: "profile",
          params: { updateSuccessFlg: true }
        });
      } else {
        this.$refs.snackbar.openSnackbar();
      }
    },
    async formatPhoto() {
      if (this.files[0].type.includes("image/")) {
        await this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
          this.files[0] = new File([blob], this.files[0].name, {
            type: this.files[0].type
          });
        });
      }
    }
  },
  watch: {
    async isSavable() {
      if (!_.isEmpty(this.files)) {
        await this.formatPhoto();
        await this.updateItem();
      }
    }
  },
  computed: {
    isNotEmptyLoginUserPhoto() {
      return !_.isEmpty(this.$store.getters["getLoginUser"].photoUrl);
    }
  },
  props: {
    isSavable: { type: Boolean, default: false }
  },
  mounted() {},
  created() {},
  components: {
    Snackbar,
    VueCropper
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
