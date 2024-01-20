<template>
  <div class="text-lg">Add new transaction <hr class="border-black"></div>
  
  <form class="grid gap-[24px]" @submit.prevent="onSubmit">
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
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

const text = ref("");
const amount = ref("");
const emit = defineEmits(["transactionSubmit"]);
const toast = useToast();

const onSubmit = () => {
  if (!text.value || !amount.value) {
    toast.error("Both fields must be filled");
    return;
  }

  const transactionData = {
    text: text.value,
    amount: parseFloat(amount.value),
  };
  emit("transactionSubmit", transactionData);
  text.value = "";
  amount.value = "";
};
</script>
