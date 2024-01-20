<template>
  <div class="text-lg">
    History
    <hr class="border-black">
  </div>
  <ul id="list" class="grid gap-[12px]">
    <li v-for="transaction in transactions" :key="transaction.id"
      class="group/item grid grid-cols-12 bg-gray-50 shadow-lg border-[0.5px] py-[8px] px-[12px] rounded-[12px]"
      :class="transaction.amount < 0 ? 'text-red-800' : 'text-green-800'">
      <div class="grid grid-flow-col col-span-11 items-center">
        <div class="grid">
          <div class="text-lg text-black font-light">{{ transaction.text }}</div>
          <div class="text-[9px] text-black "> <span class="font-bold">Transaction ID: </span>{{ transaction.id }}</div>
        </div>
        <div class="text-lg justify-self-end font-light">$ {{ transaction.amount }}
          <font-awesome-icon class="ms-[10px] opacity-70"
            :icon="transaction.amount < 0 ? 'arrow-trend-down' : 'arrow-trend-up'" />
        </div>
      </div>

      <button @click="deleteTransaction(transaction.id)"
        class="group/edit text-red-400 bg-red-200 invisible translate-all transform-all group-hover/item:visible h-[24px] w-[24px] rounded-[24px] justify-self-center">
        <!-- <font-awesome-icon icon="arrow-trend-down" /> -->
        <font-awesome-icon icon="circle-xmark" />
      </button>
    </li>
  </ul>
</template>
  
<script setup>
import { defineProps } from 'vue';
import { defineEmits } from 'vue';
const emit = defineEmits(['transactionDeleted'])
const props = defineProps({
  transactions: {
    type: Array,
    default: []
  }
})
const deleteTransaction = (id) => {
  emit('transactionDeleted', id)
}
</script>