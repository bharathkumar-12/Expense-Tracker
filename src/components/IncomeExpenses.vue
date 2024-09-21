<template>
  <div class="grid grid-flow-col gap-x-[10px]">
    <div class="grid grid-flow-col items-center border border-1 bg-green-50 p-4 gap-2 rounded-[20px]">
      <div class="grid gap-[12px] col-span-10">
        <p class="justify-self-start capitalize text-sm text-green-500 font-light">Income</p>
        <div class="text-2xl font-semibold text-green-500">
          $ {{ income }} 
        </div>
      </div>
      <font-awesome-icon class=" text-green-500 opacity-50 text-4xl" icon="arrow-up" />
    </div>
    <div class="grid grid-flow-col items-center border-1 border bg-red-50 p-4 gap-2 rounded-[20px]">
      <div class="grid gap-[12px] col-span-10">
        <p class="justify-self-start capitalize text-sm text-red-500 font-light">Expense</p>
        <div class="text-2xl font-semibold text-red-500">
          $ {{ expenses }} 
        </div>
      </div>
      <font-awesome-icon class=" text-red-500 opacity-50 text-4xl" icon="arrow-down" />
    </div>
  </div>
</template>
  
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  income: {
    type: Number,
    required: true
  },
  expenses: {
    type: Number,
    required: true
  }
})
</script>