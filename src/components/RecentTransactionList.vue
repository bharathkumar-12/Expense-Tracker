<template>
	<div class="flex flex-col gap-6 p-6">
		<div class="flex items-center justify-between mb-2">
			<div class="space-y-1">
				<h2 class="text-xl font-bold bg-gradient-to-r from-gray-200 to-gray-100 text-transparent bg-clip-text">Recent Transactions</h2>
				<p class="text-sm text-gray-500">Showing transactions from the last 24 hours</p>
			</div>
			<div class="flex items-center px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700">
				<font-awesome-icon icon="clock" class="text-gray-400 mr-2 text-xs" />
				<span class="text-xs font-medium text-gray-400">Real-time Updates</span>
			</div>
		</div>
		
		<div class="relative">
			<div class="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5 rounded-xl"></div>
			<ul class="space-y-2 relative">
				<li
					v-for="transaction in displayedTransactions"
					:key="transaction.id"
					class="group relative bg-gray-800/40 backdrop-blur-md border rounded-xl transition-all duration-300 hover:bg-gray-800/60"
					:class="[
						transaction.amount < 0 ? 'border-red-500/20 hover:border-red-500/30' : 'border-green-500/20 hover:border-green-500/30',
						'hover:shadow-lg hover:shadow-gray-900/20'
					]"
				>
					<div class="flex items-center justify-between p-4">
						<div class="space-y-1.5">
							<div class="flex items-center space-x-2">
								<div class="p-2 rounded-lg" :class="transaction.amount < 0 ? 'bg-red-500/10' : 'bg-green-500/10'">
									<font-awesome-icon 
										:icon="transaction.amount < 0 ? 'arrow-trend-down' : 'arrow-trend-up'"
										:class="transaction.amount < 0 ? 'text-red-400' : 'text-green-400'"
										class="text-sm"
									/>
								</div>
								<div class="text-base font-semibold text-gray-200">
									{{ transaction.text }}
								</div>
							</div>
							<div class="flex items-center space-x-3 pl-10">
								<div class="text-xs text-gray-500 flex items-center">
									<font-awesome-icon icon="fingerprint" class="mr-1 text-gray-600" />
									{{ transaction.id }}
								</div>
								<div class="text-xs text-gray-500 flex items-center">
									<font-awesome-icon icon="clock" class="mr-1 text-gray-600" />
									{{ displayLocalTimestamp(transaction.timestamp) }}
								</div>
							</div>
						</div>
						
						<div class="flex items-center">
							<div 
								:class="transaction.amount < 0 ? 'text-red-400 bg-red-500/10' : 'text-green-400 bg-green-500/10'" 
								class="text-lg font-bold px-4 py-2 rounded-lg"
							>
								$ {{ Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<div v-if="displayedTransactions.length === 0" class="text-center py-8">
			<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 mb-4">
				<font-awesome-icon icon="receipt" class="text-gray-400 text-xl" />
			</div>
			<h3 class="text-gray-400 font-medium">No Recent Transactions</h3>
			<p class="text-gray-500 text-sm mt-1">Transactions from the last 24 hours will appear here</p>
		</div>
	</div>
</template>

<script setup>
import { defineEmits, computed } from "vue";
const emit = defineEmits(["transactionDeleted"]);
const props = defineProps({
	transactions: {
		type: Array,
		default: [],
	},
});

const displayedTransactions = computed(() => {
	// Filter only the recent transactions from the last 24 hours
	const recentTransactions = props.transactions.filter((transaction) => {
		const transactionTimestamp = new Date(transaction.timestamp).getTime();
		const currentTimestamp = new Date().getTime();
		const twentyFourHoursAgo = currentTimestamp - 24 * 60 * 60 * 1000;
		return transactionTimestamp >= twentyFourHoursAgo;
	});

	// Sort the recent transactions in descending order based on timestamp
	const sortedTransactions = recentTransactions.sort((a, b) => {
		return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
	});

	return sortedTransactions.slice(0, 4);
});

const deleteTransaction = (id) => {
	emit("transactionDeleted", id);
};

const displayLocalTimestamp = (utcTimestamp) => {
	const utcDate = new Date(utcTimestamp);
	return new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		month: 'short',
		day: 'numeric'
	}).format(utcDate);
};
</script>

<style scoped>
.backdrop-blur-md {
	backdrop-filter: blur(12px);
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

.bg-gradient-to-r {
	background-size: 200% auto;
	animation: gradient 8s linear infinite;
}
</style>
