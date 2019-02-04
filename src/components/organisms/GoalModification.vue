<template>
  <div>
    <md-field>
      <label>目標</label>
      <md-input v-model="initial" v-validate="'required|max:255'" name="goalText"></md-input>
    </md-field>
    <span>{{ errors.first('goalText') }}</span>
    <div class="md-layout-item">
      <md-field>
        <label for="movie">カテゴリ</label>
        <md-select v-model="movie" name="movie" id="movie">
          <md-option value="fight-club">Fight Club</md-option>
          <md-option value="godfather">Godfather</md-option>
          <md-option value="godfather-ii">Godfather II</md-option>
          <md-option value="godfather-iii">Godfather III</md-option>
          <md-option value="godfellas">Godfellas</md-option>
          <md-option value="pulp-fiction">Pulp Fiction</md-option>
          <md-option value="scarface">Scarface</md-option>
        </md-select>
      </md-field>
    </div>
    <md-field>
      <label>達成のためのアクション</label>
      <md-textarea v-model="textarea"></md-textarea>
    </md-field>
  </div>
</template>

<script>
import Card from "@/components/molecules/Card";
export default {
  data() {
    return {
      initial: "",
      movie: "test",
      textarea: null
    };
  },
  methods: {},
  created() {},
  components: {
    Card
  }
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
