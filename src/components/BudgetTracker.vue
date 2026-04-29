<template>
  <div class="bg-surface-container-high/60 backdrop-blur-md rounded-xl p-6 border border-outline-variant/5">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h3 class="font-headline text-lg font-bold text-on-surface mb-1">本月预算</h3>
        <p class="text-xs text-on-surface-variant">设置并追踪您的月度支出</p>
      </div>
      <button
        @click="showEditModal = true"
        class="text-primary text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-1"
      >
        <span class="material-symbols-outlined text-base">edit</span>
        设置
      </button>
    </div>

    <!-- Budget Status Card -->
    <div v-if="monthlyBudget > 0" class="space-y-4">
      <!-- Status Indicator -->
      <div
        class="p-4 rounded-lg border"
        :class="statusClasses"
      >
        <div class="flex items-center gap-2 mb-2">
          <span
            class="material-symbols-outlined text-2xl"
            :class="iconColorClass"
          >{{ statusIcon }}</span>
          <div>
            <p class="font-semibold" :class="textColorClass">{{ statusText }}</p>
            <p class="text-xs opacity-70">{{ statusDescription }}</p>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-on-surface-variant">已支出</span>
          <span class="font-semibold text-on-surface">
            ₹{{ currentMonthExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
            <span class="text-xs text-on-surface-variant font-normal ml-1">
              / ₹{{ monthlyBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
            </span>
          </span>
        </div>
        <div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="progressBarClass"
            :style="`width: ${Math.min(budgetStatus.percent, 100)}%`"
          ></div>
        </div>
        <div class="flex justify-between text-xs">
          <span :class="textColorClass">{{ budgetStatus.percent.toFixed(1) }}% 已使用</span>
          <span class="text-on-surface-variant">
            剩余: ₹{{ Math.max(budgetStatus.remaining, 0).toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
          </span>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 gap-3 pt-2">
        <div class="bg-surface-container-highest/50 rounded-lg p-3">
          <p class="text-xs text-on-surface-variant mb-1">本月支出</p>
          <p class="font-headline font-bold text-error">
            -₹{{ currentMonthExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
          </p>
        </div>
        <div class="bg-surface-container-highest/50 rounded-lg p-3">
          <p class="text-xs text-on-surface-variant mb-1">本月收入</p>
          <p class="font-headline font-bold text-secondary">
            +₹{{ currentMonthIncome.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
          </p>
        </div>
      </div>
    </div>

    <!-- No Budget Set -->
    <div v-else class="text-center py-8 space-y-3">
      <div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mx-auto">
        <span class="material-symbols-outlined text-3xl text-on-surface-variant">account_balance_wallet</span>
      </div>
      <div>
        <p class="text-on-surface font-semibold mb-1">还未设置本月预算</p>
        <p class="text-xs text-on-surface-variant mb-4">设置预算来更好地控制您的支出</p>
        <button
          @click="showEditModal = true"
          class="px-6 py-2 bg-primary text-on-primary rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          设置预算
        </button>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-surface-container rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <h3 class="font-headline text-xl font-bold text-on-surface mb-4">设置本月预算</h3>
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-1">预算金额 (₹)</label>
            <input
              v-model.number="newBudget"
              type="number"
              min="0"
              step="100"
              placeholder="例如：10000"
              class="w-full bg-surface-container-highest border-none rounded-xl py-4 px-6 text-2xl font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40 transition-all"
            />
          </div>
          <div class="flex gap-3 pt-2">
            <button
              @click="closeModal"
              class="flex-1 py-3 bg-surface-container-highest text-on-surface rounded-full text-sm font-semibold hover:bg-surface-bright transition-colors"
            >
              取消
            </button>
            <button
              @click="saveBudget"
              class="flex-1 py-3 bg-primary text-on-primary rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";

const monthlyBudget = inject('monthlyBudget', ref(0));
const setBudget = inject('setBudget', () => {});
const budgetStatus = inject('budgetStatus', ref({ status: 'none', percent: 0, remaining: 0 }));
const currentMonthExpenses = inject('currentMonthExpenses', ref(0));
const currentMonthIncome = inject('currentMonthIncome', ref(0));

const showEditModal = ref(false);
const newBudget = ref(0);

const budgetStatusValue = computed(() => {
  return budgetStatus.value || { status: 'none', percent: 0, remaining: 0 };
});

const statusIcon = computed(() => {
  switch (budgetStatusValue.value.status) {
    case 'critical': return 'warning';
    case 'warning': return 'info';
    default: return 'check_circle';
  }
});

const statusText = computed(() => {
  switch (budgetStatusValue.value.status) {
    case 'critical': return '预算已超支！';
    case 'warning': return '预算提醒';
    default: return '预算状况良好';
  }
});

const statusDescription = computed(() => {
  switch (budgetStatusValue.value.status) {
    case 'critical': return '您本月的支出已超过预算，请控制消费。';
    case 'warning': return '您本月的支出已超过预算的80%，请注意控制。';
    default: return '您的支出在预算范围内，继续保持。';
  }
});

const statusClasses = computed(() => {
  switch (budgetStatusValue.value.status) {
    case 'critical': return 'bg-error/10 border-error/20';
    case 'warning': return 'bg-primary/10 border-primary/20';
    default: return 'bg-secondary/10 border-secondary/20';
  }
});

const iconColorClass = computed(() => {
  switch (budgetStatusValue.value.status) {
    case 'critical': return 'text-error';
    case 'warning': return 'text-primary';
    default: return 'text-secondary';
  }
});

const textColorClass = computed(() => {
  switch (budgetStatusValue.value.status) {
    case 'critical': return 'text-error';
    case 'warning': return 'text-primary';
    default: return 'text-secondary';
  }
});

const progressBarClass = computed(() => {
  switch (budgetStatusValue.value.status) {
    case 'critical': return 'bg-error';
    case 'warning': return 'bg-primary';
    default: return 'bg-secondary';
  }
});

function openModal() {
  newBudget.value = monthlyBudget.value || 0;
  showEditModal.value = true;
}

function closeModal() {
  showEditModal.value = false;
}

function saveBudget() {
  if (newBudget.value >= 0) {
    setBudget(newBudget.value);
    closeModal();
  }
}
</script>
