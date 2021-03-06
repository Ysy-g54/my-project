import _ from "lodash";
import moment from "moment";

export default {
	beforeRouteLeave(to, from, next) {
		if (this.isEdited) {
			const answer = window.confirm('行った変更が保存されない可能性があります。');
			if (answer) {
				next();
			} else {
				next(false);
			}
		} else {
			next();
		}
	},
	data: () => ({
		isEdited: false,
		loading: false
	}),
	methods: {
		formatDate(date, format) {
			if (!_.isDate(date) && _.isEmpty(date)) {
				return '';
			}
			let m = moment(date.toDate());
			if (format === undefined) {
				return m.format('YYYY/MM/DD');
			} else {
				return m.format(format);
			}
		},
		handler(event) {
			event.returnValue = '行った変更が保存されない可能性があります。';
		},
		startLoading() {
			this.loading = true;
		},
		endLoading() {
			this.loading = false;
		},
		startEdit() {
			this.isEdited = true;
		},
		endEdit() {
			this.isEdited = false;
		}
	},
	watch: {
		isEdited() {
			if (this.isEdited) {
				window.addEventListener('beforeunload', this.handler);
			} else {
				window.removeEventListener('beforeunload', this.handler);
			}
		}
	},
	mounted() {
		let title = this.$route.meta.title;
		if (title !== undefined) {
			document.title = `${title} - memoList`;
		} else {
			document.title = 'memoList';
		}
	},
	created() {
		window.removeEventListener('beforeunload', this.handler);
	},
	destroyed() {
	}
};
