import _ from "lodash";
import moment from "moment";

export default {
	methods: {
		formatDate(date, format) {
			if (!_.isDate(date) && _.isEmpty(date)) {
				return "";
			}
			let m = moment(date.toDate());
			if (format === undefined) {
				return m.format("YYYY/MM/DD");
			} else {
				return m.format(format);
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
	}
};
