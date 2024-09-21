<template>
    <div class="flex flex-col gap-[24px]  bg-slate-50 p-4 rounded-[20px]">
        <div class="text-lg">
            Recent Transactions
            <hr class="border-black" />
        </div>
        <ul id="list" class="grid gap-[12px] items-start">
            <li v-for="transaction in displayedTransactions" :key="transaction.id"
                class="grid grid-cols-12 items-center bg-white shadow-sm hover:shadow-xl transition-all border-[0.5px] py-[8px] px-[12px] rounded-[12px]"
                :class="transaction.amount < 0 ? 'text-red-500' : 'text-green-500'">
                <div class="grid grid-flow-col col-span-11 items-center">
                    <div class="grid">
                        <div class="text-lg text-black font-light">
                            {{ transaction.text }}
                        </div>
                        <div class="text-[9px] text-gray-500">
                            <span class="font-bold">Transaction ID: </span>{{ transaction.id }}
                        </div>
                    </div>
                    <div class="justify-self-end font-light grid">
                        <div class="text-lg justify-self-end">
                            $ {{ transaction.amount }}
                            <font-awesome-icon class="ms-[10px] opacity-70" :icon="transaction.amount < 0 ? 'arrow-trend-down' : 'arrow-trend-up'
                                " />
                        </div>
                        <div class="text-[9px] text-gray-500 justify-self-end">
                            {{ displayLocalTimestamp(transaction.timestamp) }}
                        </div>
                    </div>
                </div>

                <!-- <button
				@click="deleteTransaction(transaction.id)"
				class="text-red-400 bg-red-200 transition-all h-[24px] w-[24px] rounded-[24px] justify-self-center"
			>
				<font-awesome-icon icon="circle-xmark" />
			</button> -->
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineEmits, computed } from "vue";
const emit = defineEmits(["transactionDeleted"]);
const props = defineProps({
    transactions: {
        type: Array,
        default: [],
    },
});
const displayedTransactions = computed(
    () => {
        // Filter only the recent transactions from the last 24 hours
      const recentTransactions = props.transactions.filter(transaction => {
        const transactionTimestamp = new Date(transaction.timestamp).getTime();
        const currentTimestamp = new Date().getTime();
        const twentyFourHoursAgo = currentTimestamp - (24 * 60 * 60 * 1000);
        return transactionTimestamp >= twentyFourHoursAgo;
      });

      // Sort the recent transactions in descending order based on timestamp
      const sortedTransactions = recentTransactions.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });

      return sortedTransactions.slice(0,4);
    }
)
const deleteTransaction = (id) => {
    emit("transactionDeleted", id);
};
const displayLocalTimestamp = (utcTimestamp) => {
    const utcDate = new Date(utcTimestamp);
    return utcDate.toLocaleString(); // Convert to local time for display
};
</script>
