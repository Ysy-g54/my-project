<template>
	<div class="hello center">
		<h5>目標</h5>
		<div class="goal-table"></div>
	</div>
</template>

<script>
import handsonTable from 'handsontable';
import '../../../node_modules/handsontable/dist/handsontable.full.css';
import '../../../node_modules/handsontable/dist/handsontable.full.js';
export default {
	data() {
		return {
			second: 0,
			minute: 0,
			timer: '',
			goalData: ['']
		};
	},
	methods: {
		displayTable() {
			let self = this;
			self.$nextTick(() => {
				handsonTable(self.$el.querySelector('.goal-table'), {
					startCols: 3,
					colWidths: [300, 400, 200],
					colHeaders: ['目標', 'いつまでに', '達成率'],
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
