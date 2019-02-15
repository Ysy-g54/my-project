<template>
  <div>
    <md-field :class="isErrorField" md-clearable>
      <label>タイトル</label>
      <md-input v-model="initial" v-validate="'max:255'" data-vv-as="title" name="titleField"></md-input>
      <span class="md-error">{{ errors.first('titleField') }}</span>
    </md-field>
    <div class="md-layout-item">
      <md-field>
        <label for="movie">カテゴリ</label>
        <md-select v-model="movie" name="movie" id="movie">
          <md-option value="goal">目標</md-option>
          <md-option value="memo">メモ</md-option>
          <md-option value="other">その他</md-option>
        </md-select>
      </md-field>
    </div>
    <md-field>
      <label>アクション・メモ</label>
      <md-textarea v-model="textarea"></md-textarea>
    </md-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initial: "",
      movie: "test",
      textarea: null
    };
  },
  methods: {},
  watch: {},
  computed: {
    isErrorField() {
      return {
        "md-invalid": this.errors.has("titleField")
      };
    }
  },
  props: {
    memo: { type: Array, required: false }
  },
  created() {},
  components: {},
  inject: ["$validator"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

#hello {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}
</style>
