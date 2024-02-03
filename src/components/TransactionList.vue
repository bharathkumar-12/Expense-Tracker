<template>
	<div class="grid gap-[24px]">
		<div class="text-lg">
		History
		<hr class="border-black" />
	</div>
	<ul id="list" class="grid gap-[12px] max-h-[300px] overflow-scroll">
		<li
			v-for="transaction in transactions"
			:key="transaction.id"
			class="grid grid-cols-12 items-center bg-white shadow-sm hover:shadow-xl transition-all border-[0.5px] py-[8px] px-[12px] rounded-[12px]"
			:class="transaction.amount < 0 ? 'text-red-900' : 'text-green-900'"
		>
			<div class="grid grid-flow-col col-span-11 items-center">
				<div class="grid">
					<div class="text-lg text-black font-light">
						{{ transaction.text }}
					</div>
					<div class="text-[9px] text-black">
						<span class="font-bold">Transaction ID: </span>{{ transaction.id }}
					</div>
				</div>
				<div class="justify-self-end font-light grid">
					<div class="text-lg justify-self-end">
						$ {{ transaction.amount }}
						<font-awesome-icon
							class="ms-[10px] opacity-70"
							:icon="
								transaction.amount < 0 ? 'arrow-trend-down' : 'arrow-trend-up'
							"
						/>
					</div>
					<div class="text-[9px] text-black justify-self-end">
						{{ displayLocalTimestamp(transaction.timestamp) }}
					</div>
				</div>
			</div>

			<button
				@click="deleteTransaction(transaction.id)"
				class="text-red-400 bg-red-200 transition-all h-[24px] w-[24px] rounded-[24px] justify-self-center"
			>
				<!-- <font-awesome-icon icon="arrow-trend-down" /> -->
				<font-awesome-icon icon="circle-xmark" />
			</button>
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
