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
    <!-- <md-button class="md-icon-button">
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
    <div v-for="file in files" :key="file.id">
      <md-button class="md-icon-button" @click="$refs.upload.remove(file)">
        <md-icon>highlight_off</md-icon>
      </md-button>
      <VueCropper ref="cropper" :src="file.blob" :background="true"></VueCropper>
    </div>-->
  </div>
</template>

<script>
import fileUpload from "vue-upload-component";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  data() {
    return {
      //   files: []
      imgSrc: "",
      cropImg: ""
    };
  },
  methods: {
    setImage(e) {
      const file = e.target.files[0];

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
    }
    // /**
    //  * Has changed
    //  * @param  Object|undefined   newFile   Read only
    //  * @param  Object|undefined   oldFile   Read only
    //  */
    // inputFile(newFile, oldFile) {
    //   if (newFile && oldFile) {
    //     // update
    //     if (newFile.active && !oldFile.active) {
    //       // beforeSend
    //       // min size
    //       if (
    //         newFile.size >= 0 &&
    //         this.minSize > 0 &&
    //         newFile.size < this.minSize
    //       ) {
    //         this.$refs.upload.update(newFile, { error: "size" });
    //       }
    //     }
    //   }
    //   if (!newFile && oldFile) {
    //     // remove
    //     if (oldFile.success && oldFile.response.id) {
    //     }
    //   }
    //   // Automatically activate upload
    //   if (
    //     Boolean(newFile) !== Boolean(oldFile) ||
    //     oldFile.error !== newFile.error
    //   ) {
    //     if (this.uploadAuto && !this.$refs.upload.active) {
    //       this.$refs.upload.active = true;
    //     }
    //   }
    // },
    // /**
    //  * Pretreatment
    //  * @param  Object|undefined   newFile   Read and write
    //  * @param  Object|undefined   oldFile   Read only
    //  * @param  Function           prevent   Prevent changing
    //  */
    // inputFilter(newFile, oldFile, prevent) {
    //   if (newFile && !oldFile) {
    //     // Before adding a file
    //     // Filter system files or hide files
    //     if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
    //       return prevent();
    //     }
    //     // Filter php html js file
    //     if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
    //       return prevent();
    //     }
    //   }
    //   if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
    //     // Create a blob field
    //     newFile.blob = "";
    //     let URL = window.URL || window.webkitURL;
    //     if (URL && URL.createObjectURL) {
    //       newFile.blob = URL.createObjectURL(newFile.file);
    //     }
    //     // Thumbnails
    //     newFile.thumb = "";
    //     if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
    //       newFile.thumb = newFile.blob;
    //     }
    //   }
    // }
  },
  watch: {},
  computed: {},
  props: {
    isSavable: { type: Boolean, default: false }
  },
  mounted() {},
  created() {},
  components: {
    fileUpload,
    VueCropper
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
