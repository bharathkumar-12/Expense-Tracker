<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div>
      <h2 class="font-headline text-4xl font-extrabold tracking-tight mb-2">New Transaction</h2>
      <p class="text-on-surface-variant text-lg">Log your spending or earnings.</p>
    </div>

    <!-- Glass Form -->
    <div class="glass-panel p-8 rounded-xl space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

      <!-- Income / Expense Toggle -->
      <div class="flex p-1 bg-surface-container-lowest rounded-full w-fit">
        <button
          @click="transactionType = 'Expense'"
          class="px-8 py-2 rounded-full text-sm font-semibold transition-all"
          :class="transactionType === 'Expense'
            ? 'bg-surface-container-highest text-primary'
            : 'text-on-surface-variant hover:text-on-surface'"
        >Expense</button>
        <button
          @click="transactionType = 'Income'"
          class="px-8 py-2 rounded-full text-sm font-semibold transition-all"
          :class="transactionType === 'Income'
            ? 'bg-surface-container-highest text-secondary'
            : 'text-on-surface-variant hover:text-on-surface'"
        >Income</button>
      </div>

      <!-- Amount Input -->
      <div class="space-y-2">
        <label class="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-1">Amount</label>
        <div class="relative">
          <span
            class="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold"
            :class="transactionType === 'Income' ? 'text-secondary' : 'text-primary'"
          >₹</span>
          <input
            v-model="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            class="w-full bg-surface-container-highest border-none rounded-xl py-6 pl-14 pr-6 text-4xl font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-outline-variant transition-all"
          />
        </div>
        <p v-if="errors.amount" class="text-error text-xs ml-1">{{ errors.amount }}</p>
      </div>

      <!-- Transaction Name -->
      <div class="space-y-2">
        <label class="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-1">Name</label>
        <input
          v-model="text"
          type="text"
          placeholder="e.g. Monthly Salary, Coffee..."
          class="w-full bg-surface-container-highest border-none rounded-xl py-4 px-6 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40 transition-all"
        />
        <p v-if="errors.text" class="text-error text-xs ml-1">{{ errors.text }}</p>
      </div>

      <!-- Submit Button -->
      <div class="pt-2">
        <button
          @click="onSubmit"
          class="w-full py-5 font-headline font-bold text-lg rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95"
          :class="transactionType === 'Income'
            ? 'bg-secondary text-on-secondary shadow-[0_10px_30px_rgba(111,251,133,0.3)] hover:shadow-[0_15px_40px_rgba(111,251,133,0.5)]'
            : 'bg-primary text-on-primary shadow-[0_10px_30px_rgba(104,211,255,0.3)] hover:shadow-[0_15px_40px_rgba(104,211,255,0.5)]'"
        >
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">add_circle</span>
          Add {{ transactionType }}
        </button>
      </div>
    </div>

    <!-- Quick Add Tags -->
    <div class="flex flex-wrap gap-3">
      <span class="text-xs uppercase tracking-widest text-on-surface-variant w-full ml-1">Quick Add</span>
      <button
        v-for="tag in quickTags"
        :key="tag"
        @click="text = tag"
        class="px-5 py-2 rounded-full border border-outline-variant/20 hover:bg-surface-container-highest text-sm text-on-surface-variant hover:text-on-surface transition-all active:scale-95"
      >{{ tag }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useToast } from "vue-toastification";

const emit = defineEmits(["transactionSubmit"]);
const toast = useToast();

const text = ref("");
const amount = ref("");
const transactionType = ref("Expense");
const errors = reactive({ text: '', amount: '' });

const quickTags = ['Cloud Infrastructure', 'Engineering Payroll', 'Enterprise License', 'SaaS Renewal', 'Marketing Campaign', 'Legal & Compliance'];

function onSubmit() {
  errors.text = '';
  errors.amount = '';

  if (!text.value.trim()) {
    errors.text = 'Transaction name is required';
    return;
  }
  const parsed = parseFloat(amount.value);
  if (!amount.value || isNaN(parsed) || parsed <= 0) {
    errors.amount = 'Please enter a valid amount';
    return;
  }

  emit("transactionSubmit", {
    text: text.value.trim(),
    amount: parsed,
    type_of_transaction: transactionType.value,
  });

  text.value = "";
  amount.value = "";
  transactionType.value = "Expense";
  toast.success("Transaction added!");
}
</script>
