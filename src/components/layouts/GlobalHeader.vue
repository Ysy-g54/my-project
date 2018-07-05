<template>
	<div class="header global-header">
		<nav>
			<div class="nav-wrapper left">
				<ul class="tabs tabs-transparent js-global-header-tabs">
					<li class="tab">
						<router-link class="waves-effect waves-light" :to="{name:'mypage'}" exact href="#">
							<a class="mypage"></a>
						</router-link>
					</li>
					<li class="tab">
						<router-link class="waves-effect waves-light" :to="{name:'wallet'}" href="#">
							<a class="memo"></a>
						</router-link>
					</li>
					<li class="tab">
						<router-link class="waves-effect waves-light" :to="{name:'goal'}" href="#">
							<a class="goal"></a>
						</router-link>
					</li>	
					<li class="tab">
						<router-link class="waves-effect waves-light" :to="{name:'login'}" href="#">
							達成度
						</router-link>
					</li>
				</ul>
			</div>
			<div :class="{ progress: preloaderFlg }">
				<div class="indeterminate"></div>
			</div>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'GlobalHeader',
	watch: {
		preloaderFlg() {
			console.error('!');
		}
	},
	props: {
		preloaderFlg: { type: Boolean }
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
