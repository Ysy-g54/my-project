<template>
		<nav  class="progress-bottom light-green lighten-4">
			<div class="nav-wrapper">
				<a data-target="modal1" class="modal-trigger"><i class="gear"></i></a>
				<div :class="{ progress: preloaderFlg }">
					<div class="indeterminate"></div>
				</div>
			</div>
			<!-- Modal Structure -->
			<div id="modal1" class="modal">
				<div class="modal-content black-text">
					<h4>Modal Header</h4>
					<p>A bunch of text</p>
				</div>
				<div class="modal-footer">
					<a class="modal-close waves-effect waves-green btn-flat">閉じる</a>
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
	},
	mounted() {
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
