<template>
	<div class="flex flex-col gap-6 p-6 max-h-[520px] overflow-y-auto">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-bold text-gray-200">Transaction History</h2>
			<div class="text-sm text-gray-400">{{ transactions.length }} transactions</div>
		</div>
		
		<ul class="space-y-3">
			<li
				v-for="transaction in transactions"
				:key="transaction.id"
				class="group relative bg-gray-800/30 backdrop-blur-sm border rounded-xl transition-all duration-300 hover:bg-gray-800/40"
				:class="transaction.amount < 0 ? 'border-red-500/20' : 'border-green-500/20'"
			>
				<div class="flex items-center justify-between p-4">
					<div class="space-y-1">
						<div class="text-base font-medium text-gray-200">
							{{ transaction.text }}
						</div>
						<div class="text-xs text-gray-500">
							ID: {{ transaction.id }}
						</div>
						<div class="text-xs text-gray-400">
							{{ displayLocalTimestamp(transaction.timestamp) }}
						</div>
					</div>
					
					<div class="flex items-center space-x-4">
						<div :class="transaction.amount < 0 ? 'text-red-400' : 'text-green-400'" class="text-lg font-bold">
							$ {{ Math.abs(transaction.amount) }}
							<font-awesome-icon
								class="ml-2 text-sm opacity-70"
								:icon="transaction.amount < 0 ? 'arrow-trend-down' : 'arrow-trend-up'"
							/>
						</div>
						
						<button
							@click="deleteTransaction(transaction.id)"
							class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-red-400/10 rounded-lg"
						>
							<font-awesome-icon 
								icon="circle-xmark" 
								class="text-red-400 text-lg"
							/>
						</button>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { defineProps } from "vue";
import { defineEmits } from "vue";
const emit = defineEmits(["transactionDeleted"]);
const props = defineProps({
	transactions: {
		type: Array,
		default: [],
	},
});
const deleteTransaction = (id) => {
	emit("transactionDeleted", id);
};
const displayLocalTimestamp = (utcTimestamp) => {
	const utcDate = new Date(utcTimestamp);
	return utcDate.toLocaleString(); // Convert to local time for display
};
</script>

<style scoped>
/* Custom Scrollbar */
.overflow-y-auto {
	scrollbar-width: thin;
	scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
	width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
	background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 3px;
}

.backdrop-blur-sm {
	backdrop-filter: blur(8px);
}
</style>
