<template>
	<div class="flex flex-col gap-[24px] bg-slate-50 px-8 py-4 rounded-xl max-h-[520px] overflow-scroll">
		<div class="text-lg">
			History
			<hr class="border-black opacity-10" />
		</div>
		<ul id="list" class="grid gap-[12px]">
			<li
				v-for="transaction in transactions"
				:key="transaction.id"
				class="grid group grid-cols-12 gap-4 items-center shadow-sm hover:shadow-xl transition-all border-[0.5px] py-[8px] px-[16px] rounded-[12px]"
				:class="
					transaction.amount < 0
						? 'text-red-500 bg-red-50'
						: 'text-green-500 bg-green-50'
				"
			>
				<div class="flex flex-row gap-4 col-span-11 justify-between">
					<div class="grid">
						<div class="text-sm lg:text-lg text-black font-light">
							{{ transaction.text }}
						</div>
						<div class="text-[9px] text-gray-500">
							<span class="font-bold">Transaction ID: </span
							>{{ transaction.id }}
						</div>
					</div>
					<div class="justify-self-end font-light grid">
						<div class="text-sm lg:text-lg justify-self-end">
							$ {{ transaction.amount }}
							<font-awesome-icon
								class="ms-[10px] opacity-70"
								:icon="
									transaction.amount < 0 ? 'arrow-trend-down' : 'arrow-trend-up'
								"
							/>
						</div>
						<div class="text-[9px] text-gray-500 justify-self-end">
							{{ displayLocalTimestamp(transaction.timestamp) }}
						</div>
					</div>
				</div>

				<button
					@click="deleteTransaction(transaction.id)"
					class="text-red-500 invisible group-hover:visible delay-200 ease-in-out transition-all transform-cpu bg-transparent h-[24px] w-[24px] rounded-[24px] justify-self-center"
				>
					<!-- <font-awesome-icon icon="arrow-trend-down" /> -->
					<font-awesome-icon icon="circle-xmark" class="bg-transparent" />
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
