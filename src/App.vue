<template>
	<div>
		<header-view></header-view>
		<router-view></router-view>
	</div>
</template>

<script>
import HeaderView from './components/layouts/Header.vue';
export default {
	components: {
		HeaderView
	}
};
</script>

<style>
@import './assets/stylesheet.css';
@import '../node_modules/materialize-css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
