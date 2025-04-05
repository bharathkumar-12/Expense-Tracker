<template>
	<div class="flex flex-col gap-4 p-4 justify-center relative">
		<div class="text-sm text-gray-400 font-medium tracking-wide uppercase">Total Balance</div>
		<h1 class="text-4xl lg:text-5xl font-bold tracking-tight">
			<span class="text-2xl mr-1 text-gray-400">$</span>
			<span class="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text animate-gradient">
				{{ total >= 0 ? total : Math.abs(total) }}
			</span>
		</h1>
		<div class="text-sm font-medium" :class="total >= 0 ? 'text-green-400' : 'text-red-400'">
			{{ total >= 0 ? '↗ Positive' : '↘ Negative' }} Balance
		</div>
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

<style scoped>
.animate-gradient {
	background-size: 200% auto;
	animation: shine 4s linear infinite;
}

@keyframes shine {
	to {
		background-position: 200% center;
	}
}
</style>
