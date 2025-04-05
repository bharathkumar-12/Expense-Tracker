<template>
	<div class="flex flex-col gap-6 p-6">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-bold text-gray-200">Add Transaction</h2>
		</div>
		
		<FormKit
			type="form"
			id="adding-transaction"
			@submit="onSubmit"
			:actions="false"
			:config="{
				classes: {
					input: 'bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 w-full focus:outline-none focus:border-indigo-500 transition-colors duration-200',
					label: 'block text-sm font-medium text-gray-400 mb-1',
					message: 'text-red-400 text-xs mt-1',
					outer: 'mb-4',
				}
			}"
		>
			<FormKit
				type="text"
				name="text"
				label="Transaction Name"
				prefix-icon="text"
				placeholder="Enter transaction name..."
				:validation-messages="{
					required: 'Transaction name is required',
				}"
				validation="required|text"
			/>
			<FormKit
				type="number"
				name="amount"
				label="Amount"
				prefix-icon="dollar"
				placeholder="Enter amount..."
				validation="required|number"
				:validation-messages="{
					required: 'Transaction amount is required',
				}"
			/>
			<FormKit
				type="select"
				label="Transaction Type"
				placeholder="Select transaction type"
				name="type_of_transaction"
				validation="required"
				:options="['Income', 'Expense']"
				:validation-messages="{
					required: 'Transaction type is required',
				}"
			/>
			<button
				type="submit"
				class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mt-6"
			>
				<font-awesome-icon icon="plus" class="text-sm" />
				<span>Add Transaction</span>
			</button>
		</FormKit>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { reset } from "@formkit/core";

const text = ref("");
const amount = ref("");
const emit = defineEmits(["transactionSubmit"]);
const toast = useToast();
const submitted = ref(false);

const onSubmit = (param) => {
	console.log(param);

	const transactionData = {
		text: param.text,
		amount: parseFloat(param.amount),
		type_of_transaction: param.type_of_transaction,
	};
	emit("transactionSubmit", transactionData);
	reset("adding-transaction");
};
</script>

<style scoped>
/* FormKit Custom Styles */
:deep(.formkit-input:focus) {
	box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

:deep(.formkit-select) {
	background-color: rgba(31, 41, 55, 0.3);
	border-color: rgb(55, 65, 81);
	color: rgb(229, 231, 235);
}

:deep(.formkit-select option) {
	background-color: rgb(31, 41, 55);
	color: rgb(229, 231, 235);
}

/* Placeholder styles */
:deep(.formkit-input::placeholder) {
	color: rgba(156, 163, 175, 0.5);
}
</style>
