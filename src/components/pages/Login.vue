<template>
	<div class="hello center">
		<h4>ログイン</h4>
		<ul>
			<a class="btn white-text" @click="countStart">ログイン</a>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	methods: {
		countStart() {
			this.$router.push({
				name: 'mypage'
			});
		}
	},
	watch: {
	},
	created() {
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
	list-style-type: none;
  padding: 0;
}
li {
	display: inline-block;
  margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
