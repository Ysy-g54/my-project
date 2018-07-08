<template>
	<div class="row">
		<div class="col s12">
			<ul class="tabs">
				<li class="tab">
					<router-link class="waves-effect waves-light" :to="{name:'mypage'}" exact href="#">
						<a class="mypage tooltipped" data-position="bottom" data-tooltip="マイページ"></a>
					</router-link>
				</li>
				<li class="tab">
					<router-link class="waves-effect waves-light" :to="{name:'wallet'}" href="#">
						<a class="memo tooltipped"  data-position="bottom" data-tooltip="メモ"></a>
					</router-link>
				</li>
				<li class="tab">
					<router-link class="waves-effect waves-light" :to="{name:'goal'}" href="#">
						<a class="goal tooltipped"  data-position="bottom" data-tooltip="目標"></a>
					</router-link>
				</li>	
				<li class="tab">
					<router-link class="waves-effect waves-light" :to="{name:'mypage'}" href="#">
						達成度
					</router-link>
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
import $ from '../../ui/jquery-ex';
export default {
	name: 'NaviHeader',
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
		$.tooltip.initialize(this, '.tooltipped');
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
