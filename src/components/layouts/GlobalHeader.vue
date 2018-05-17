<template>
	<div class="header global-header">
		<nav>
			<div class="nav-wrapper">
				<ul class="tabs tabs-transparent left js-global-header-tabs">
					<li class="tab">
						<router-link class="waves-effect waves-light" :to="{name:'mypage'}" exact href="#">
							マイページ
						</router-link>
					</li>
					<li class="tab">
						<router-link class="waves-effect waves-light" :to="{name:'wallet'}" href="#">
							お金管理
						</router-link>
					</li>
					<li class="tab">
						<router-link class="waves-effect waves-light" :to="{name:'goal'}" href="#">
							目標
						</router-link>
					</li>
					<li class="tab">
						<a class="waves-effect waves-light" @click='goLevel'>
							達成度
						</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>

<script>
export default {
	data() {
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
</style>
