<template>
	<div class="p-6 lg:px-16 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
		<div class="flex flex-col md:flex-row justify-between items-center">
			<h1 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
				Expense Tracker
				<span class="text-xs font-normal text-gray-400 ml-2">v1.0</span>
			</h1>
			<div class="mt-2 md:mt-0 text-gray-400 text-sm lg:text-base font-medium">
				Simplify Your Finances • Track • Budget • Save
			</div>
		</div>
	</div>
</template>

<style scoped>
.bg-gradient-to-r {
	background-size: 200% auto;
	animation: shine 8s linear infinite;
}

@keyframes shine {
	to {
		background-position: 200% center;
	}
}
</style>
