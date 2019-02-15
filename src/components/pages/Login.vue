<template>
  <div>
    <md-field md-clearable>
      <label>メールアドレス</label>
      <md-input v-model="mailAddress"></md-input>
    </md-field>
    <md-field :md-toggle-password="false">
      <label>パスワード</label>
      <md-input v-model="password" type="password"></md-input>
    </md-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mailAddress: "",
      password: ""
    };
  },
  methods: {},
  watch: {},
  computed: {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
