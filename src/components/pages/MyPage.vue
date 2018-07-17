<template>
	<div class="hello center">
		<h4>{{ msg }}</h4>
		<h5>今日やること</h5>
		<a class='dropdown-trigger btn white-text' href='#' data-activates='dropdown1' @click="clickDropDown">{{ toDo }}</a>
		<ul id='dropdown1' class='dropdown-content'>
			<ul v-for="(toDo, index) in toDoList" v-if="toDo !== null && toDo !== ''" :key="index">
				<li @click.stop.prevent="selectToDo(toDo, index)"><a href="#">{{ toDo }}</a></li>
			</ul>
		</ul>
			<a class="waves-effect waves-light btn white-text" @click="timerStart">
				{{ timerBtn }}
			</a>
			<a class="waves-effect waves-light btn white-text" @click="save">
				<i></i>
			</a>
		<ul>
			<li v-if="minute != 0">{{ minute }}分</li><li>{{ second }}秒</li>
		</ul>
		<div class="todo-table"></div>
	</div>
</template>

<script>
import handsonTable from 'handsontable';
import $ from '../../ui/jquery-ex';
import '../../../node_modules/handsontable/dist/handsontable.full.css';
import '../../../node_modules/handsontable/dist/handsontable.full.js';
export default {
	data() {
		return {
			msg: 'Welcome to Your Study App',
			start: true,
			second: 0,
			minute: 0,
			saveTaskTime: 0,
			timer: '',
			tableValue: [],
			toDoList: [],
			toDo: '---',
			timerBtn: 'タイマーstart',
			toDoIndex: 0
		};
	},
	methods: {
		save() {
			console.error('保存');
		},
		timerStart() {
			if (this.start) {
				this.start = false;
				this.timer = setInterval(() => {
					this.second++;
				}, 1000);
				this.timerBtn = 'タイマーstop';
				$.dropdown.initialize(this, '.dropdown-trigger');
				this.$emit('startTimer', true);
			} else {
				this.countStop();
			}
		},
		countStop() {
			this.start = true;
			clearTimeout(this.timer);
			this.timerBtn = 'タイマーstart';
			this.$emit('startTimer', false);
			if (this.selectedTodo()) {
				this.tableValue.setDataAtCell(this.toDoIndex, 2, this.saveTaskTime);
			}
		},
		clickDropDown() {
			this.toDoList = this.tableValue.getDataAtCol(0);
		},
		selectToDo(toDo, index) {
			if (this.selectedTodo()) {
				this.tableValue.setDataAtCell(this.toDoIndex, 2, this.saveTaskTime);
			}
			this.toDo = toDo;
			this.toDoIndex = index;
			$.dropdown.close(this, '.dropdown-trigger');
			if (this.start) {
				this.timerStart();
			}
		},
		selectedTodo() {
			return this.toDo !== '---';
		},
		displayTable() {
			this.$nextTick(() => {
				this.tableValue = handsonTable(this.$el.querySelector('.todo-table'), {
					startCols: 3,
					startRows: 10,
					colWidths: [600, 100, 100],
					colHeaders: ['やること', '何分', '実績(分)'],
					rowHeaders: true,
					manualRowMove: true,
					comments: true,
					contextMenu: {
						items: {
							row_above: {
								name: '上に行を挿入'
							},
							row_below: {
								name: '下に行を挿入'
							},
							commentsAddEdit: {
								name: 'セルにコメントを挿入する'
							},
							commentsRemove: {
								name: 'セルにコメントを削除する'
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
				this.saveTaskTime++;
				this.minute++;
				this.second = 0;
			}
		},
		toDo() {
			if (this.tableValue.getDataAtCell(this.toDoIndex, 2) !== null) {
				this.saveTaskTime = this.tableValue.getDataAtCell(this.toDoIndex, 2);
			} else {
				this.saveTaskTime = 0;
			}
		}
	},
	created() {
		this.displayTable();
	},
	mounted() {
		$.dropdown.initialize(this, '.dropdown-trigger');
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.save{
  background: url("../../img/keep.png");
  background-size: contain;
}
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
