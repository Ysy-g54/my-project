<template>
  <div>
    <md-dialog-prompt
      :md-active.sync="isActiveDialog"
      v-model="editItem"
      :md-title="getTarget"
      :md-cancel-text="'キャンセル'"
      @md-confirm="updateItem"
    />
    <md-list class="md-double-line">
      <md-list-item>
        <div class="md-list-item-text">
          <span>{{ getValue }}</span>
          <span>{{ getTarget }}</span>
        </div>
        <md-button class="md-icon-button" @click="editMode">
          <md-icon>edit</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
export default {
  data() {
    return {
      database: firebase.firestore(),
      editItem: null,
      isActiveDialog: false,
      itemNms: [
        { target: "displayName", value: "名前" },
        { target: "mailAddress", value: "メールアドレス" }
      ]
    };
  },
  methods: {
    editMode() {
      this.isActiveDialog = true;
    },
    updateItem() {
      let currentUser = firebase.auth().currentUser;

      (!(this.$route.params.target === "mailAddress")
        ? currentUser.updateProfile({
            displayName:
              this.$route.params.target === "displayName"
                ? this.editItem
                : this.$store.getters["getLoginUser"].displayName,
            photoURL:
              this.$route.params.target === "photoURL"
                ? this.editItem
                : this.$store.getters["getLoginUser"].photoURL
          })
        : currentUser.updateEmail(this.editItem)
      ).then(() => {
        this.$store.dispatch("findLoginUser").then(() => {
          this.$router.back();
        });
      });
    }
  },
  watch: {},
  computed: {
    getValue() {
      return this.$store.getters["getLoginUser"][this.$route.params.target];
    },
    getTarget() {
      return this.itemNms
        .filter(itemNm => this.$route.params.target === itemNm.target)
        .map(filterItem => filterItem.value)
        .join();
    }
  },
  props: {},
  mounted() {},
  created() {
    this.editItem = this.getValue;
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.picture-title {
  color: rgba(0, 0, 0, 0.54);
}
</style>
