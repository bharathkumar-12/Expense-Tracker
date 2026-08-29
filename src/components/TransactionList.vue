<template>
  <div class="space-y-6">
    <!-- Page Title -->
    <h1 class="font-headline font-extrabold text-4xl tracking-tight text-on-surface">History</h1>

    <!-- Search Bar -->
    <div class="relative group">
      <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
        <span class="material-symbols-outlined">search</span>
      </div>
      <input
        v-model="searchQuery"
        class="w-full bg-surface-container-highest border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-bright transition-all font-body"
        placeholder="Search transactions..."
      />
    </div>

    <!-- Filter Chips -->
    <div class="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
      <button
        v-for="chip in filterChips"
        :key="chip.value"
        @click="activeFilter = chip.value"
        class="flex-none px-6 py-2 rounded-full text-sm transition-all active:scale-95"
        :class="activeFilter === chip.value
          ? 'bg-primary text-on-primary-fixed font-semibold'
          : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant/10 hover:border-primary/30 font-medium'"
      >{{ chip.label }}</button>
    </div>

    <!-- Transaction count -->
    <p class="text-xs text-on-surface-variant px-1">{{ totalCount }} transaction{{ totalCount !== 1 ? 's' : '' }}</p>

    <!-- Grouped Transaction List -->
    <div class="space-y-6">
      <template v-for="(group, dateLabel) in groupedTransactions" :key="dateLabel">
        <div class="space-y-2">
          <h3 class="text-xs font-label uppercase tracking-widest text-on-surface-variant px-2">{{ dateLabel }}</h3>

          <div
            v-for="transaction in group"
            :key="transaction.id"
            class="group bg-surface-container-low/40 backdrop-blur-sm p-4 rounded-xl flex items-center justify-between hover:bg-surface-container-high transition-all cursor-pointer border border-transparent hover:border-outline-variant/20"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center group-hover:scale-105 transition-transform"
                :class="transaction.amount > 0 ? 'text-secondary' : 'text-primary'"
              >
                <span class="material-symbols-outlined">{{ categoryIcon(transaction) }}</span>
              </div>
              <div>
                <p class="font-headline font-bold text-on-surface">{{ transaction.text }}</p>
                <p class="text-xs text-on-surface-variant font-body">{{ formatTime(transaction.timestamp) }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <p class="font-headline font-bold" :class="transaction.amount > 0 ? 'text-secondary' : 'text-error'">
                {{ transaction.amount > 0 ? '+' : '-' }}₹{{ Math.abs(transaction.amount).toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
              </p>
              <button
                @click.stop="deleteTransaction(transaction.id)"
                class="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-error/10 rounded-lg"
              >
                <span class="material-symbols-outlined text-error text-base">close</span>
              </button>
            </div>
          </div>
        </div>
      </template>

      <div v-if="totalCount === 0" class="text-center py-16 space-y-3">
        <div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mx-auto">
          <span class="material-symbols-outlined text-on-surface-variant text-2xl">receipt_long</span>
        </div>
        <p class="text-on-surface-variant font-medium">No transactions found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["transactionDeleted"]);
const props = defineProps({
  transactions: { type: Array, default: [] },
});

const searchQuery = ref('');
const activeFilter = ref('all');

const filterChips = [
  { label: 'All', value: 'all' },
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
];

const filteredTransactions = computed(() => {
  let result = [...props.transactions];

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(t => t.text.toLowerCase().includes(q));
  }

  if (activeFilter.value === 'income') result = result.filter(t => t.amount > 0);
  else if (activeFilter.value === 'expense') result = result.filter(t => t.amount < 0);

  return result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
});

const totalCount = computed(() => filteredTransactions.value.length);

const groupedTransactions = computed(() => {
  const groups = {};
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  for (const t of filteredTransactions.value) {
    const d = new Date(t.timestamp);
    let label;
    if (d.toDateString() === today.toDateString()) label = 'Today';
    else if (d.toDateString() === yesterday.toDateString()) label = 'Yesterday';
    else label = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    if (!groups[label]) groups[label] = [];
    groups[label].push(t);
  }
  return groups;
});

function categoryIcon(transaction) {
  const text = transaction.text.toLowerCase();
  if (transaction.amount > 0) return 'payments';
  if (text.includes('food') || text.includes('dining') || text.includes('coffee') || text.includes('lunch') || text.includes('groceries')) return 'restaurant';
  if (text.includes('transport') || text.includes('uber') || text.includes('car')) return 'commute';
  if (text.includes('rent') || text.includes('home')) return 'home_work';
  if (text.includes('gym') || text.includes('health')) return 'fitness_center';
  if (text.includes('shop') || text.includes('apple') || text.includes('movie')) return 'shopping_bag';
  if (text.includes('phone') || text.includes('internet') || text.includes('bill') || text.includes('utilities')) return 'receipt';
  return 'paid';
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: 'numeric', hour12: true, month: 'short', day: 'numeric'
  }).format(new Date(timestamp));
}

function deleteTransaction(id) {
  const confirmed = confirm("确定要删除这条交易吗？删除后将无法恢复。");
  if (confirmed) {
    emit("transactionDeleted", id);
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
