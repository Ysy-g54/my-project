<template>
	<div class="header global-header">
		<nav  class="progress-bottom">
			<div class="row">
				<div class="input-field col s4">
					<input placeholder="検索" id="first_name" type="text" class="validate">
				</div>
				<div :class="{ progress: preloaderFlg }">
					<div class="indeterminate"></div>
				</div>
			</div>
		</nav>
	</div>
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
</style>
