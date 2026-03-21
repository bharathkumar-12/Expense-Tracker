<template>
  <div class="space-y-2">
    <div
      v-for="transaction in displayedTransactions"
      :key="transaction.id"
      class="flex items-center justify-between p-4 rounded-xl bg-surface-container hover:bg-surface-container-highest transition-colors cursor-pointer group"
    >
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center group-hover:bg-surface-container-highest transition-colors"
          :class="transaction.amount > 0 ? 'text-secondary' : 'text-primary'"
        >
          <span class="material-symbols-outlined">{{ categoryIcon(transaction) }}</span>
        </div>
        <div>
          <p class="text-on-surface font-semibold font-body">{{ transaction.text }}</p>
          <p class="text-on-surface-variant text-xs">
            {{ transaction.amount > 0 ? 'Income' : 'Expense' }} · {{ formatTime(transaction.timestamp) }}
          </p>
        </div>
      </div>
      <p class="font-headline font-bold" :class="transaction.amount > 0 ? 'text-secondary' : 'text-error'">
        {{ transaction.amount > 0 ? '+' : '-' }}₹{{ Math.abs(transaction.amount).toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
      </p>
    </div>

    <div v-if="displayedTransactions.length === 0" class="text-center py-10 text-on-surface-variant">
      <span class="material-symbols-outlined text-3xl block mb-2">receipt_long</span>
      No transactions yet
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  transactions: { type: Array, default: [] },
});

const displayedTransactions = computed(() =>
  [...props.transactions]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5)
);

function categoryIcon(transaction) {
  const text = transaction.text.toLowerCase();
  if (transaction.amount > 0) return 'payments';
  if (text.includes('food') || text.includes('dining') || text.includes('coffee') || text.includes('lunch') || text.includes('groceries')) return 'restaurant';
  if (text.includes('transport') || text.includes('uber')) return 'commute';
  if (text.includes('rent') || text.includes('home')) return 'home_work';
  if (text.includes('shop') || text.includes('apple') || text.includes('movie')) return 'shopping_bag';
  if (text.includes('phone') || text.includes('internet') || text.includes('bill') || text.includes('utilities')) return 'receipt';
  return 'paid';
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
  }).format(new Date(timestamp));
}
</script>
