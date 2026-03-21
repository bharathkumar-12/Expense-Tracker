<template>
  <div class="bg-surface-variant/40 backdrop-blur-2xl rounded-xl p-8 border border-outline-variant/10 shadow-2xl relative overflow-hidden">
    <!-- Ambient gradient -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -mr-32 -mt-32 rounded-full pointer-events-none"></div>

    <div class="relative z-10">
      <p class="font-label text-on-surface-variant uppercase tracking-[0.2em] text-xs font-semibold mb-2">Total Balance</p>
      <h1 class="font-headline text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-8">
        <span :class="total >= 0 ? 'text-white' : 'text-error'">
          {{ total < 0 ? '-' : '' }}₹{{ Math.abs(total).toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
        </span>
      </h1>

      <div class="grid grid-cols-2 gap-4">
        <!-- Income -->
        <div class="bg-surface-container-high/60 backdrop-blur-md rounded-xl p-5 border border-outline-variant/5">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-secondary text-lg">south_west</span>
            </div>
            <span class="font-label text-on-surface-variant text-xs font-medium uppercase tracking-wider">Income</span>
          </div>
          <p class="font-headline text-xl font-bold text-secondary">+₹{{ parseFloat(income).toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}</p>
        </div>

        <!-- Expenses -->
        <div class="bg-surface-container-high/60 backdrop-blur-md rounded-xl p-5 border border-outline-variant/5">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-error text-lg">north_east</span>
            </div>
            <span class="font-label text-on-surface-variant text-xs font-medium uppercase tracking-wider">Expenses</span>
          </div>
          <p class="font-headline text-xl font-bold text-error">-₹{{ Math.abs(parseFloat(expenses)).toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  total: { type: Number, required: true },
  income: { type: Number, required: true },
  expenses: { type: Number, required: true },
});
</script>
