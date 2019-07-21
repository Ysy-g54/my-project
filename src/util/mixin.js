export default {
	mounted() {
		let title = this.$route.meta.title;
		if (title !== undefined) {
			document.title = `${title} - memoList`;
		} else {
			document.title = 'memoList';
		}
	}
};
