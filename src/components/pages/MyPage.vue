<template>
	<div class="hello center">
		<h4>{{ msg }}</h4>
		<h5>今日やること</h5>
		<div class="todo-table"></div>
		<ul>
			<li v-if="minute != 0">{{ minute }}分</li><li>{{ second }}秒</li>
		</ul>
		<ul>
			<a v-if="start" class="btn white-text" @click="countStart">勉強スタート</a>
			<a v-else class="btn white-text" @click="countStop">一旦ストップ</a>
		</ul>
	</div>
</template>

<script>
import handsonTable from 'handsontable';
import '../../../node_modules/handsontable/dist/handsontable.full.css';
import '../../../node_modules/handsontable/dist/handsontable.full.js';
export default {
	data() {
		return {
			msg: 'Welcome to Your Study App',
			start: true,
			second: 0,
			minute: 0,
			timer: '',
			todoData: ['']
		};
	},
	methods: {
		countStart() {
			this.start = false;
			this.timer = setInterval(() => {
				this.second++;
			}, 1000);
		},
		countStop() {
			this.start = true;
			clearTimeout(this.timer);
		},
		displayTable() {
			let self = this;
			self.$nextTick(() => {
				handsonTable(self.$el.querySelector('.todo-table'), {
					startCols: 2,
					colWidths: [600, 100],
					colHeaders: ['やること', '何分'],
					columnSorting: true,
					rowHeaders: true,
					manualRowMove: true
				});
			});
		}
	},
	watch: {
		second() {
			if (this.second === 60) {
				this.minute++;
				this.second = 0;
			}
		}
	},
	created() {
		this.displayTable();
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
