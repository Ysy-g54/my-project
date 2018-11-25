<template>
	<div>
		<components :is="$route.meta.currentHeader"></components>
	</div>
</template>

<script>
export default {
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
