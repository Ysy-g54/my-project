<template>
  <div>
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
      alt="Source Image"
      :img-style="{ width: '400px', height: '300px' }"
    ></VueCropper>
    <img :src="cropImg" alt="Cropped Image" />
    <br />

    <button @click="cropImage" v-if="imgSrc != ''" style="margin-right: 40px;">Crop</button>
    <button @click="rotate" v-if="imgSrc != ''">Rotate</button>
    <Snackbar ref="snackbar" :message="'更新しました'" />
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
      resultUrl: null
    };
  },
  methods: {
    setImage(e) {
      const file = e.target.files[0];
      this.files[0] = file;

      if (!file.type.includes("image/")) {
        alert("Please select an image file");
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
    rotate() {
      // guess what this does :)
      this.$refs.cropper.rotate(90);
    },
    async uploadFile() {
      let storageRef = firebase.storage().ref();
      let uploadRef = storageRef.child(this.files[0].name);
      let uploadResult = await uploadRef.put(this.files[0]);
      this.resultUrl = await storageRef
        .child(`${uploadResult.metadata.fullPath}`)
        .getDownloadURL();
    },
    async updateItem() {
      let currentUser = firebase.auth().currentUser;
      await this.formatPhoto();
      await this.uploadFile();

      currentUser
        .updateProfile({
          displayName: this.$store.getters["getLoginUser"].displayName,
          photoURL: !_.isEmpty(this.files)
            ? this.resultUrl
            : this.$store.getters["getLoginUser"].photoURL
        })
        .then(() => {
          this.$store.dispatch("findLoginUser").then(() => {
            this.$refs.snackbar.openSnackbar();
          });
        });
    },
    async formatPhoto() {
      await this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        this.files[0] = new File([blob], this.files[0].name, {
          type: this.files[0].type
        });
      });
    }
  },
  watch: {
    isSavable() {
      if (!_.isEmpty(this.files)) {
        this.updateItem();
      }
    }
  },
  computed: {},
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
