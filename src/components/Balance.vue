<template>
	<div class="flex flex-col gap-4 p-4 justify-center">
		<div class="text-sm font-['Roboto'] justify-self-start">Current Balance</div>
		<h1 class=" text-4xl lg:text-5xl font-['Montserrat'] font-bold text-center">$ {{ total }}</h1>
	</div>
</template>

<script setup>
const props = defineProps({
	total: {
		type: Number,
		required: true,
	},
});
</script>

<style></style>
