<template>
	<div class="flex flex-col gap-[24px]">
		<div class="text-lg">
			Add new transaction <hr class="border-[0.5px] border-black">
		</div>
		<FormKit
			type="form"
			id="adding-transaction"
			submit-label="Add Transaction"
			@submit="onSubmit"
			:actions="false"
		>
			<FormKit
				type="text"
				name="text"
				prefix-icon="text"
				placeholder="Transaction name.."
				:validation-messages="{
					required: 'Transaction name is required',
				}"
				validation="required|text"
			/>
			<FormKit
				type="number"
				name="amount"
				prefix-icon="dollar"
				placeholder="-34"
				validation="required|number"
				:validation-messages="{
					required: 'Transaction amount is required',
				}"
			/>
			<FormKit type="submit" prefix-icon="add" class="red" label="Add Transaction" />
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
	};
	emit("transactionSubmit", transactionData);
	reset("adding-transaction");
};
</script>
<style>
button{
  background-color: aquamarine;
}
</style>