<template>
  <div class="bg-surface-container-high/60 backdrop-blur-md rounded-xl p-6 border border-outline-variant/5">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="font-headline text-lg font-bold text-on-surface mb-1">分类汇总</h3>
        <p class="text-xs text-on-surface-variant">按分类统计您的支出和收入</p>
      </div>
      <!-- Toggle between expense and income -->
      <div class="flex p-1 bg-surface-container-lowest rounded-full">
        <button
          @click="activeTab = 'expense'"
          class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
          :class="activeTab === 'expense'
            ? 'bg-error/20 text-error'
            : 'text-on-surface-variant hover:text-on-surface'"
        >支出</button>
        <button
          @click="activeTab = 'income'"
          class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
          :class="activeTab === 'income'
            ? 'bg-secondary/20 text-secondary'
            : 'text-on-surface-variant hover:text-on-surface'"
        >收入</button>
      </div>
    </div>

    <!-- Category List -->
    <div v-if="filteredCategories.length > 0" class="space-y-3">
      <div
        v-for="cat in filteredCategories"
        :key="cat.key"
        class="bg-surface-container-highest/50 rounded-lg p-4 hover:bg-surface-container-highest/80 transition-colors"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center"
              :class="cat.isExpense ? 'bg-error/10' : 'bg-secondary/10'"
            >
              <span
                class="material-symbols-outlined"
                :class="cat.isExpense ? 'text-error' : 'text-secondary'"
              >{{ cat.icon }}</span>
            </div>
            <div>
              <p class="font-semibold text-on-surface">{{ cat.label }}</p>
              <p class="text-xs text-on-surface-variant">{{ cat.count }} 笔交易</p>
            </div>
          </div>
          <div class="text-right">
            <p
              class="font-headline font-bold"
              :class="cat.isExpense ? 'text-error' : 'text-secondary'"
            >
              {{ cat.isExpense ? '-' : '+' }}₹{{ cat.currentMonthAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
            </p>
            <p class="text-xs text-on-surface-variant">
              总计: {{ cat.isExpense ? '-' : '+' }}₹{{ cat.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
            </p>
          </div>
        </div>
        <!-- Progress Bar -->
        <div class="w-full h-1.5 bg-surface rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-300"
            :class="cat.isExpense ? 'bg-error/60' : 'bg-secondary/60'"
            :style="`width: ${getCategoryPercent(cat)}%`"
          ></div>
        </div>
        <p class="text-xs text-on-surface-variant mt-1">
          占本月{{ cat.isExpense ? '支出' : '收入' }}的 {{ getCategoryPercent(cat).toFixed(1) }}%
        </p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-8 space-y-3">
      <div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mx-auto">
        <span class="material-symbols-outlined text-3xl text-on-surface-variant">category</span>
      </div>
      <div>
        <p class="text-on-surface font-semibold mb-1">暂无{{ activeTab === 'expense' ? '支出' : '收入' }}记录</p>
        <p class="text-xs text-on-surface-variant">添加交易后将在此显示分类汇总</p>
      </div>
    </div>

    <!-- Summary Footer -->
    <div v-if="filteredCategories.length > 0" class="mt-6 pt-4 border-t border-outline-variant/10">
      <div class="flex justify-between items-center text-sm">
        <span class="text-on-surface-variant">本月{{ activeTab === 'expense' ? '总支出' : '总收入' }}</span>
        <span
          class="font-headline font-bold text-lg"
          :class="activeTab === 'expense' ? 'text-error' : 'text-secondary'"
        >
          {{ activeTab === 'expense' ? '-' : '+' }}₹{{ tabTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";

const categorySummary = inject('categorySummary', ref([]));
const currentMonthExpenses = inject('currentMonthExpenses', ref(0));
const currentMonthIncome = inject('currentMonthIncome', ref(0));

const activeTab = ref('expense');

const filteredCategories = computed(() => {
  const summary = categorySummary.value || [];
  return summary.filter(cat => {
    if (activeTab.value === 'expense') return cat.isExpense;
    return !cat.isExpense;
  });
});

const tabTotal = computed(() => {
  return filteredCategories.value.reduce((sum, cat) => sum + cat.currentMonthAmount, 0);
});

function getCategoryPercent(cat) {
  const total = activeTab.value === 'expense' 
    ? currentMonthExpenses.value 
    : currentMonthIncome.value;
  if (total <= 0) return 0;
  return (cat.currentMonthAmount / total) * 100;
}
</script>
