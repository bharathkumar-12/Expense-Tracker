<template>
	<div class="flex flex-col gap-6 justify-center">
		<div class="flex flex-col md:flex-row gap-6 w-full">
			<div class="flex-1 bg-gray-800/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-4 hover:bg-gray-800/40 transition-all duration-300">
				<div class="flex items-center justify-between">
					<div class="space-y-2">
						<p class="text-green-400 text-sm font-medium uppercase tracking-wide">Income</p>
						<div class="text-2xl font-bold text-green-400">
							$ {{ income }}
						</div>
					</div>
					<div class="bg-green-400/10 p-3 rounded-lg">
						<font-awesome-icon
							class="text-green-400 text-xl"
							icon="arrow-up"
						/>
					</div>
				</div>
			</div>

			<div class="flex-1 bg-gray-800/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 hover:bg-gray-800/40 transition-all duration-300">
				<div class="flex items-center justify-between">
					<div class="space-y-2">
						<p class="text-red-400 text-sm font-medium uppercase tracking-wide">Expense</p>
						<div class="text-2xl font-bold text-red-400">
							$ {{ Math.abs(expenses) }}
						</div>
					</div>
					<div class="bg-red-400/10 p-3 rounded-lg">
						<font-awesome-icon
							class="text-red-400 text-xl"
							icon="arrow-down"
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4">
			<IncomeExpenseChart />
		</div>
	</div>
</template>

<script setup>
import { defineProps } from "vue";
import IncomeExpenseChart from "../components/IncomeExpenseChart.vue";
const props = defineProps({
	income: {
		type: Number,
		required: true,
	},
	expenses: {
		type: Number,
		required: true,
	},
});
</script>

<style scoped>
.backdrop-blur-sm {
	backdrop-filter: blur(8px);
}
</style>
