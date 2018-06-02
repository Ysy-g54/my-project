<template>
	<div class="hello center">
		<h4>{{ msg }}</h4>
		<h5>今日やること</h5>
		<div class="todo-table"></div>
		<ul>
			<li v-if="minute != 0">{{ minute }}分</li><li>{{ second }}秒</li>
		</ul>
		<ul　class="right">
			<a v-if="start" class="btn white-text" @click="countStart">保存</a>
			<a v-else class="btn white-text" @click="countStop">完了</a>
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
			tableValue: []
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
			this.tableValue.setDataAtCell(0, 2, this.minute);
		},
		displayTable() {
			let self = this;
			self.$nextTick(() => {
				this.tableValue = handsonTable(self.$el.querySelector('.todo-table'), {
					startCols: 3,
					startRows: 10,
					colWidths: [600, 100, 100],
					colHeaders: ['やること', '何分', '実績(何分)'],
					rowHeaders: true,
					manualRowMove: true,
					contextMenu: {
						items: {
							row_above: {
								name: '上に行を挿入'
							},
							row_below: {
								name: '下に行を挿入'
							}
						}
					}
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
