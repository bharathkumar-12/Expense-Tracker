<template>
  <div class="grid grid-flow-col gap-x-[10px]">
    <div class="grid grid-flow-col items-center shadow-inner bg-green-100 p-[10px] rounded-[12px]">
      <div class="grid gap-[12px] col-span-10">
        <p class="justify-self-start uppercase text-sm font-light">Income</p>
        <div class="text-2xl font-normal">
          $ {{ income }} 
        </div>
      </div>
      <font-awesome-icon class=" text-green-900 opacity-50 text-4xl" icon="arrow-up" />
    </div>
    <div class="grid grid-flow-col items-center shadow-inner bg-red-100 p-[10px] rounded-[12px]">
      <div class="grid gap-[12px] col-span-10">
        <p class="justify-self-start uppercase text-sm font-light">Expense</p>
        <div class="text-2xl font-normal">
          $ {{ expenses }} 
        </div>
      </div>
      <font-awesome-icon class=" text-red-900 opacity-50 text-4xl" icon="arrow-down" />
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