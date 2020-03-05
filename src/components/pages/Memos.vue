<template>
  <div>
    <Memos />
  </div>
</template>

<script>
import Memos from "@/components/organisms/Memos";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data() {
    return {};
  },
  methods: {},
  watch: {},
  props: {},
  computed: {},
  async created() {
    if (
      this.$store.getters["getLoginUser"].providerId === "google.com" &&
      this.$store.getters["getLoginUser"].memoDisplayForm === ""
    ) {
      await firebase
        .firestore()
        .collection("userSetting")
        .add({
          userId: this.$store.getters["getLoginUser"].uid,
          memoDisplayForm: "0"
        });
    }
  },
  components: {
    Memos
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
