<template>
	<div class="center">
		<h5>メモ</h5>
		<div class="memo-table"></div>
	</div>
</template>

<script>
import handsonTable from 'handsontable';
import '../../../node_modules/handsontable/dist/handsontable.full.css';
import '../../../node_modules/handsontable/dist/handsontable.full.js';
export default {
	data() {
		return {
			memoData: ['']
		};
	},
	methods: {
		displayTable() {
			let self = this;
			self.$nextTick(() => {
				handsonTable(self.$el.querySelector('.memo-table'), {
					startCols: 3,
					colWidths: [200, 400, 200],
					colHeaders: ['誰から', '金額', 'いつ返した'],
					columnSorting: true,
					rowHeaders: true,
					manualRowMove: true
				});
			});
		}
	},
	watch: {
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
