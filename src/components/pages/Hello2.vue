<template>
  <div name="header">
    <slot></slot>
    <div name="hello">
      <h1>{{ msg }}</h1>
      <h2>Essential Links</h2>
      <ul>
        <li>
          <a>Core Docs</a>
        </li>
        <li>
          <a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a>
        </li>
        <li>
          <a href="http://chat.vuejs.org/" target="_blank" rel="noopener">Vue Community Chat</a>
        </li>
        <li>
          <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
        </li>
        <li>
          <a
            href="http://vuejs-templates.github.io/webpack/"
            target="_blank"
            rel="noopener"
          >Docs for This Template</a>
        </li>
      </ul>
      <h2>Ecosystem</h2>
      <ul>
        <li>
          <a href="http://router.vuejs.org/" target="_blank" rel="noopener">vue-router</a>
        </li>
        <li>
          <a href="http://vuex.vuejs.org/" target="_blank" rel="noopener">vuex</a>
        </li>
        <li>
          <a href="http://vue-loader.vuejs.org/" target="_blank" rel="noopener">vue-loader</a>
        </li>
        <li>
          <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a>
        </li>
        <li>
          <a @click="test" target="_blank">hello</a>
        </li>
      </ul>
      <textField inline="必須"></textField>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/atoms/TextField";
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js PWA"
    };
  },
  methods: {
    test() {
      this.$router.push({
        path: "/"
      });
    }
  },
  created() {},
  components: {
    TextField
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
