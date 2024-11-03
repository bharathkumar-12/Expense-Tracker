<template>
	<div class="flex flex-col gap-4 justify-center">
		<div class="flex flex-col md:flex-row gap-6 mx-auto">
			<div
				class="grid grid-flow-col items-center border border-1 bg-green-50 px-8 py-4 rounded-xl"
			>
				<div class="grid gap-2 col-span-10">
					<p
						class="justify-self-start capitalize text-sm text-green-500 font-light"
					>
						Income
					</p>
					<div class="text-base lg:text-xl font-semibold text-green-500">
						$ {{ income }}
					</div>
				</div>
				<font-awesome-icon
					class="text-green-500 opacity-50 text-4xl ps-4"
					icon="arrow-up"
				/>
			</div>

			<div
				class="grid grid-flow-col items-center border-1 border bg-red-50 px-8 py-4 rounded-xl"
			>
				<div class="grid gap-2 col-span-10">
					<p
						class="justify-self-start capitalize text-sm text-red-500 font-light"
					>
						Expense
					</p>
					<div class="text-base lg:text-xl font-semibold text-red-500">
						$ {{ expenses }}
					</div>
				</div>
				<font-awesome-icon
					class="text-red-500 opacity-50 text-4xl ps-4"
					icon="arrow-down"
				/>
			</div>
		</div>

		<IncomeExpenseChart />
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
