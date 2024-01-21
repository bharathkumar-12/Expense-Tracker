<template>
  <div class="text-lg">Add new transaction <hr class="border-black"></div>
  
  <!-- <form class="grid gap-[24px]" @submit.prevent="onSubmit">
    <div class="grid gap-[5px]">
      <label for="text" class="text-sm">Name of transaction</label>
      <input
        type="text"
        v-model="text"
        class="border-[1px] rounded-[10px] px-4 py-2 border-blue-100 focus:outline-none focus:border-blue-200"
        placeholder="Enter Details..."
      />
    </div>
    <div class="grid gap-[5px]">
      <label for="amount" class="text-sm"
        >Amount <br />
        (negative - expense, positive - income)
      </label>
      <input
        type="number"
        v-model="amount"
        class="border-[1px] rounded-[10px] px-4 py-2 border-blue-100 focus:outline-none focus:border-blue-200"
        placeholder="Enter Amount..."
      />
      
    </div>
    
    <button class="bg-gray-800 hover:bg-gray-900 transition-all p-[5px] text-white rounded-[4px]">Add Transaction</button>
  </form> -->
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
    <FormKit type="submit" prefix-icon="add" label="Add Transaction" />
  </FormKit>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { reset } from '@formkit/core'

const text = ref("");
const amount = ref("");
const emit = defineEmits(["transactionSubmit"]);
const toast = useToast();
const submitted = ref(false);

const onSubmit = (param) => {
  console.log(param)

  const transactionData = {
    text: param.text,
    amount: parseFloat(param.amount),
  };
  emit("transactionSubmit", transactionData);
  reset('adding-transaction')
};
</script>
