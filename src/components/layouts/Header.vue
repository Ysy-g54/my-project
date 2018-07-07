<template>
	<div>
		<component :is="$route.meta.currentHeader" :preloaderFlg="preloaderFlg"></component>
	</div>
</template>

<script>
export default {
	props: {
		preloaderFlg: { type: Boolean }
	}
};
</script>
<style scoped>
</style>
