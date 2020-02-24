<template>
  <div>
    <md-dialog :md-active.sync="active" :md-fullscreen="false">
      <video ref="video" id="video" width="500" height="500" autoplay></video>
      <div>
        <md-button class="md-icon-button" @click="capture">
          <md-icon>camera_alt</md-icon>
        </md-button>
      </div>
      <canvas ref="canvas" id="canvas" width="500" height="500"></canvas>
    </md-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      video: {},
      canvas: {},
      captures: []
    };
  },
  methods: {
    async capture() {
      this.canvas = await this.$refs.canvas;
      this.canvas.toBlob(blob => {
        this.captures.push({
          name: "camera",
          url: URL.createObjectURL(blob),
          raw: blob
        });
      });
      this.active = await false;
      await this.$emit("set-file", this.captures[0]);
    },
    async openDialog() {
      this.active = await true;
      this.video = await this.$refs.video;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.video.srcObject = await stream;
        await this.video.play();
      }
    }
  },
  watch: {},
  computed: {},
  props: {},
  mounted() {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
