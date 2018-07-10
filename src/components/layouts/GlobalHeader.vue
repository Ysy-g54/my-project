<template>
		<nav  class="progress-bottom light-green lighten-4">
			<div class="nav-wrapper">
				<div class="left input-field col s4">
					<input placeholder="検索" type="text" class="validate">
				</div>
				<i class="gear"></i>
				<div :class="{ progress: preloaderFlg }">
					<div class="indeterminate"></div>
				</div>
			</div>
		</nav>
</template>

<script>
export default {
	props: {
		preloaderFlg: { type: Boolean }
	},
	watch: {
	},
	methods: {
		goLevel() {
			console.log('Level of achievement');
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progress-bottom {
	margin-bottom: 1.5em;
}
.mypage{
  background: url("../../img/mypage.png") no-repeat;
  background-size: contain;
}
.memo{
  background: url("../../img/memo.png") no-repeat;
  background-size: contain;
}
.goal{
  background: url("../../img/goal.png") no-repeat;
  background-size: contain;
}
.gear{
	background: url("../../img/gear.png") no-repeat;
	background-size: contain;
}
</style>
