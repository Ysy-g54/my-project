<template>
	<div>
		<component :is="$route.meta.currentHeader"></component>
	</div>
</template>

<script>
export default {
};
</script>
<style scoped>
</style>
