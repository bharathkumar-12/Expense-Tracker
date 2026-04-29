<template>
  <div class="min-h-screen bg-background text-on-surface overflow-x-hidden">

    <!-- Atmospheric Background Blobs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
      <div class="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full"></div>
      <div class="absolute bottom-[10%] left-[20%] w-[25%] h-[25%] bg-tertiary/5 blur-[100px] rounded-full"></div>
    </div>

    <!-- Desktop Sidebar (lg+) -->
    <aside class="hidden lg:flex h-screen w-64 fixed left-0 top-0 border-r border-white/5 bg-black/40 backdrop-blur-xl flex-col p-4 gap-2 z-50">
      <div class="mb-8 px-4">
        <h1 class="text-2xl font-black tracking-tighter text-white font-headline">Obsidian</h1>
        <p class="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Financial Dashboard</p>
      </div>
      <nav class="flex flex-col gap-1">
        <button
          @click="currentView = 'dashboard'"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left w-full"
          :class="currentView === 'dashboard' ? 'bg-white/10 text-white font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'"
        >
          <span class="material-symbols-outlined" :style="currentView === 'dashboard' ? 'font-variation-settings: &quot;FILL&quot; 1' : ''">dashboard</span>
          Dashboard
        </button>
        <button
          @click="currentView = 'history'"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left w-full"
          :class="currentView === 'history' ? 'bg-white/10 text-white font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'"
        >
          <span class="material-symbols-outlined">history</span>
          History
        </button>
        <button
          @click="currentView = 'add'"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left w-full"
          :class="currentView === 'add' ? 'bg-white/10 text-white font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'"
        >
          <span class="material-symbols-outlined">add_circle</span>
          Add Transaction
        </button>
        <button
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left w-full text-on-surface-variant hover:text-on-surface hover:bg-white/5"
        >
          <span class="material-symbols-outlined">settings</span>
          Settings
        </button>
      </nav>
      <div class="mt-auto p-4 flex items-center gap-3 bg-white/5 rounded-xl">
        <div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
          <span class="material-symbols-outlined text-primary">person</span>
        </div>
        <div>
          <p class="text-sm font-bold">Expense Tracker</p>
          <p class="text-xs text-on-surface-variant">v1.0</p>
        </div>
      </div>
    </aside>

    <!-- Mobile TopAppBar -->
    <nav class="lg:hidden fixed top-0 w-full bg-transparent backdrop-blur-xl z-50 flex justify-between items-center px-6 py-4">
      <span class="text-2xl font-black text-white tracking-tight font-headline">Obsidian</span>
      <button class="w-10 h-10 flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors rounded-full active:scale-95">
        <span class="material-symbols-outlined">notifications</span>
      </button>
    </nav>

    <!-- Desktop Top Header (right panel) -->
    <header class="hidden lg:flex fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-black/20 backdrop-blur-md justify-between items-center px-8">
      <div class="flex items-center gap-3 bg-surface-container-highest px-4 py-2 rounded-full w-80">
        <span class="material-symbols-outlined text-on-surface-variant text-sm">search</span>
        <input
          class="bg-transparent border-none focus:outline-none text-sm w-full text-on-surface placeholder-on-surface-variant"
          placeholder="Search transactions..."
        />
      </div>
      <div class="flex items-center gap-4">
        <button class="relative text-on-surface-variant hover:text-on-surface transition-colors">
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 lg:ml-64 lg:pt-16">

      <!-- Dashboard View -->
      <div v-if="currentView === 'dashboard'" class="pt-24 pb-32 lg:pt-8 lg:pb-12 px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        <!-- Hero Balance Card -->
        <Balance :total="+total" :income="+income" :expenses="+expenses" />

        <!-- Budget Tracker Card -->
        <BudgetTracker />

        <!-- Quick Insights Bento Grid (md+) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Chart (spans 2 cols) -->
          <div class="md:col-span-2 bg-surface-container-high rounded-xl p-6">
            <IncomeExpenseChart />
          </div>
          <!-- Savings card -->
          <div class="bg-primary-container rounded-xl p-6 flex flex-col justify-between text-on-primary-container relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            <div>
              <h3 class="font-headline text-lg font-bold mb-1">Total Saved</h3>
              <p class="text-xs opacity-80 font-medium">Net balance this period</p>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <span class="text-3xl font-black font-headline">₹{{ total >= 0 ? Number(total).toLocaleString('en-IN') : '0' }}</span>
              </div>
              <div class="w-full h-2 bg-on-primary-container/20 rounded-full overflow-hidden">
                <div class="h-full bg-on-primary-container rounded-full" :style="`width: ${savingsPercent}%`"></div>
              </div>
              <p class="text-xs opacity-70">{{ savingsPercent }}% income retained</p>
            </div>
          </div>
        </div>

        <!-- Category Summary -->
        <CategorySummary />

        <!-- Recent Transactions -->
        <section class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="font-headline text-xl font-bold text-on-surface">Recent Transactions</h2>
            <button @click="currentView = 'history'" class="text-primary text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">View All</button>
          </div>
          <RecentTransactionList :transactions="transactions" />
        </section>
      </div>

      <!-- History View -->
      <div v-if="currentView === 'history'" class="pt-24 pb-32 lg:pt-8 lg:pb-12 px-6 lg:px-8 max-w-2xl mx-auto">
        <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
      </div>

      <!-- Add Transaction View -->
      <div v-if="currentView === 'add'" class="pt-24 pb-32 lg:pt-8 lg:pb-12 px-6 lg:px-8 max-w-2xl mx-auto">
        <AddTransaction @transactionSubmit="handleTransactionSubmitAndNavigate" />
      </div>

    </main>

    <!-- Mobile Bottom Nav -->
    <nav class="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-surface-container/80 backdrop-blur-2xl shadow-[0_-20px_40px_rgba(0,0,0,0.4)]" style="border-radius: 2rem 2rem 0 0;">
      <button
        @click="currentView = 'dashboard'"
        class="flex flex-col items-center justify-center p-3 transition-all active:scale-90 duration-300 rounded-full"
        :class="currentView === 'dashboard' ? 'text-primary bg-surface-container-highest' : 'text-on-surface-variant hover:text-on-surface'"
      >
        <span class="material-symbols-outlined" :style="currentView === 'dashboard' ? 'font-variation-settings: &quot;FILL&quot; 1' : ''">dashboard</span>
        <span class="text-[10px] font-medium uppercase tracking-wider mt-1">Dashboard</span>
      </button>
      <button
        @click="currentView = 'history'"
        class="flex flex-col items-center justify-center p-3 transition-all active:scale-90 duration-300 rounded-full"
        :class="currentView === 'history' ? 'text-primary bg-surface-container-highest' : 'text-on-surface-variant hover:text-on-surface'"
      >
        <span class="material-symbols-outlined">history</span>
        <span class="text-[10px] font-medium uppercase tracking-wider mt-1">History</span>
      </button>
      <!-- FAB-style Add -->
      <button @click="currentView = 'add'" class="flex flex-col items-center justify-center">
        <div class="w-14 h-14 bg-primary-container rounded-full flex items-center justify-center text-on-primary-fixed shadow-lg shadow-primary/30 -mt-8 mb-1 hover:scale-105 active:scale-95 transition-transform">
          <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">add</span>
        </div>
        <span class="text-[10px] font-medium uppercase tracking-wider text-on-surface-variant">Add</span>
      </button>
      <button class="flex flex-col items-center justify-center p-3 text-on-surface-variant hover:text-on-surface transition-all active:scale-90 duration-300">
        <span class="material-symbols-outlined">settings</span>
        <span class="text-[10px] font-medium uppercase tracking-wider mt-1">Settings</span>
      </button>
    </nav>

  </div>
</template>

<script setup>
import Balance from "./components/Balance.vue";
import AddTransaction from "./components/AddTransaction.vue";
import IncomeExpenseChart from "./components/IncomeExpenseChart.vue";
import TransactionList from "./components/TransactionList.vue";
import RecentTransactionList from "./components/RecentTransactionList.vue";
import BudgetTracker from "./components/BudgetTracker.vue";
import CategorySummary from "./components/CategorySummary.vue";
import { ref, computed, onMounted, provide } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const currentView = ref('dashboard');

const CATEGORIES = {
  income: [
    { key: 'salary', label: '工资', icon: 'payments' },
    { key: 'investment', label: '投资收益', icon: 'trending_up' },
    { key: 'freelance', label: '兼职收入', icon: 'work' },
    { key: 'other_income', label: '其他收入', icon: 'credit_card' },
  ],
  expense: [
    { key: 'food', label: '餐饮', icon: 'restaurant' },
    { key: 'transport', label: '交通', icon: 'commute' },
    { key: 'shopping', label: '购物', icon: 'shopping_bag' },
    { key: 'entertainment', label: '娱乐', icon: 'movie' },
    { key: 'housing', label: '住房', icon: 'home_work' },
    { key: 'utilities', label: '水电网费', icon: 'receipt' },
    { key: 'healthcare', label: '医疗', icon: 'health_and_safety' },
    { key: 'education', label: '教育', icon: 'school' },
    { key: 'other_expense', label: '其他支出', icon: 'paid' },
  ],
};

const transactions = ref([
  { id: 100001, text: "TCS Enterprise SaaS License Q4",       amount:  1250000, timestamp: "2024-10-02T10:00:00.000Z", category: 'salary' },
  { id: 100002, text: "Infosys BPM Platform Fee",             amount:   820000, timestamp: "2024-10-07T09:30:00.000Z", category: 'salary' },
  { id: 100003, text: "Wipro Digital — Annual License",       amount:   980000, timestamp: "2024-10-14T11:00:00.000Z", category: 'salary' },
  { id: 100004, text: "AWS Partner Revenue Share Q3",         amount:   340000, timestamp: "2024-10-19T14:00:00.000Z", category: 'investment' },
  { id: 100005, text: "HCL Technologies SaaS Renewal",        amount:   760000, timestamp: "2024-10-25T10:00:00.000Z", category: 'salary' },
  { id: 100006, text: "Cognizant Enterprise Support",         amount:  1120000, timestamp: "2024-11-01T09:00:00.000Z", category: 'salary' },
  { id: 100007, text: "API Gateway Revenue Q4",               amount:   280000, timestamp: "2024-11-08T16:00:00.000Z", category: 'freelance' },
  { id: 100008, text: "Tech Mahindra Implementation Fee",     amount:   640000, timestamp: "2024-11-14T11:30:00.000Z", category: 'salary' },
  { id: 100009, text: "Zoho Corp Custom Dev Contract",        amount:  1050000, timestamp: "2024-11-21T10:00:00.000Z", category: 'freelance' },
  { id: 100010, text: "Enterprise Training Programme",        amount:   180000, timestamp: "2024-11-27T14:00:00.000Z", category: 'other_income' },
  { id: 200001, text: "AWS Cloud Infrastructure — Oct",      amount: -520000,  timestamp: "2024-10-03T08:00:00.000Z", category: 'utilities' },
  { id: 200002, text: "Engineering Payroll — Oct",           amount: -1650000, timestamp: "2024-10-07T08:30:00.000Z", category: 'other_expense' },
  { id: 200003, text: "Google Cloud Platform — Oct",         amount: -240000,  timestamp: "2024-10-13T09:00:00.000Z", category: 'utilities' },
  { id: 200004, text: "Office Rent — Bengaluru HQ",          amount: -420000,  timestamp: "2024-10-20T10:00:00.000Z", category: 'housing' },
  { id: 200005, text: "Product & Design Payroll — Nov",      amount: -1250000, timestamp: "2024-11-04T08:30:00.000Z", category: 'other_expense' },
  { id: 200006, text: "Performance Marketing — Q4",          amount: -580000,  timestamp: "2024-11-10T12:00:00.000Z", category: 'other_expense' },
  { id: 200007, text: "Datadog + Grafana Observability",     amount: -180000,  timestamp: "2024-11-16T09:00:00.000Z", category: 'utilities' },
  { id: 200008, text: "CrowdStrike Zero Trust Security",     amount: -260000,  timestamp: "2024-11-22T10:00:00.000Z", category: 'utilities' },
  { id: 200009, text: "GitHub + GitLab Enterprise",          amount: -110000,  timestamp: "2024-11-28T11:00:00.000Z", category: 'utilities' },
  { id: 200010, text: "Engineering Payroll — Dec",           amount: -1650000, timestamp: "2024-12-04T08:30:00.000Z", category: 'other_expense' },
  { id: 200011, text: "Legal & Compliance Audit Q4",         amount: -220000,  timestamp: "2024-12-10T14:00:00.000Z", category: 'other_expense' },
  { id: 200012, text: "AWS Cloud Infrastructure — Dec",      amount: -580000,  timestamp: "2024-12-16T09:00:00.000Z", category: 'utilities' },
  { id: 200013, text: "Recruitment & ATS Platform",          amount: -320000,  timestamp: "2024-12-23T10:00:00.000Z", category: 'other_expense' },
  { id: 200014, text: "Slack + Zoom Enterprise Grid",        amount: -150000,  timestamp: "2024-12-30T09:00:00.000Z", category: 'utilities' },
]);

const total = computed(() =>
  transactions.value.reduce((acc, t) => acc + t.amount, 0).toFixed(2)
);

const income = computed(() =>
  transactions.value.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2)
);

const expenses = computed(() =>
  transactions.value.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2)
);

const savingsPercent = computed(() => {
  const inc = parseFloat(income.value);
  const tot = parseFloat(total.value);
  if (inc <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((tot / inc) * 100)));
});

const monthlyBudget = ref(0);

const currentMonthTransactions = computed(() => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  return transactions.value.filter(t => {
    const date = new Date(t.timestamp);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  });
});

const currentMonthExpenses = computed(() => {
  return currentMonthTransactions.value
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);
});

const currentMonthIncome = computed(() => {
  return currentMonthTransactions.value
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
});

const budgetStatus = computed(() => {
  const budget = monthlyBudget.value;
  const spent = currentMonthExpenses.value;
  if (budget <= 0) return { status: 'none', percent: 0, remaining: 0 };
  const percent = (spent / budget) * 100;
  const remaining = budget - spent;
  if (percent >= 100) return { status: 'critical', percent, remaining };
  if (percent >= 80) return { status: 'warning', percent, remaining };
  return { status: 'normal', percent, remaining };
});

const categorySummary = computed(() => {
  const summary = {};
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  transactions.value.forEach(t => {
    const date = new Date(t.timestamp);
    const isCurrentMonth = date.getFullYear() === currentYear && date.getMonth() === currentMonth;
    const category = t.category || (t.amount > 0 ? 'other_income' : 'other_expense');
    const isExpense = t.amount < 0;

    if (!summary[category]) {
      const allCategories = [...CATEGORIES.income, ...CATEGORIES.expense];
      const catInfo = allCategories.find(c => c.key === category);
      summary[category] = {
        key: category,
        label: catInfo?.label || category,
        icon: catInfo?.icon || 'paid',
        isExpense,
        currentMonthAmount: 0,
        totalAmount: 0,
        count: 0,
      };
    }

    const absAmount = Math.abs(t.amount);
    summary[category].totalAmount += absAmount;
    summary[category].count += 1;
    if (isCurrentMonth) {
      summary[category].currentMonthAmount += absAmount;
    }
  });

  return Object.values(summary).sort((a, b) => {
    if (a.isExpense !== b.isExpense) return a.isExpense ? -1 : 1;
    return b.currentMonthAmount - a.currentMonthAmount;
  });
});

const transformedData = computed(() =>
  transactions.value.map(({ amount, timestamp }) => {
    const day = new Date(timestamp).toISOString().split('T')[0];
    return [day, amount > 0 ? amount : 0, amount < 0 ? Math.abs(amount) : 0];
  })
);

const DEMO_VERSION = 'v3-enterprise-inr';

onMounted(() => {
  const savedVersion = localStorage.getItem("transactions_version");
  if (savedVersion !== DEMO_VERSION) {
    localStorage.removeItem("transactions");
    localStorage.setItem("transactions_version", DEMO_VERSION);
  } else {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved) transactions.value = saved;
  }
  const savedBudget = localStorage.getItem("monthlyBudget");
  if (savedBudget) monthlyBudget.value = parseFloat(savedBudget);
});

function setBudget(amount) {
  monthlyBudget.value = amount;
  localStorage.setItem("monthlyBudget", amount.toString());
  toast.success("预算已更新");
}

function handleTransactionSubmit({ text, amount, type_of_transaction, category }) {
  if (type_of_transaction === 'Expense') amount = amount * -1;
  const newTransaction = {
    id: Math.floor(Math.random() * 1000000),
    text,
    amount,
    type_of_transaction,
    category: category || (amount > 0 ? 'other_income' : 'other_expense'),
    timestamp: new Date().toISOString(),
  };
  transactions.value.push(newTransaction);
  saveTransactionsToLocalStorage();
  
  if (amount < 0 && budgetStatus.value.status === 'critical') {
    toast.error("警告：本月预算已超支！", { timeout: 5000 });
  } else if (amount < 0 && budgetStatus.value.status === 'warning') {
    toast.warning("提醒：本月支出已超过预算的80%", { timeout: 3000 });
  } else {
    toast.success(`${text} added`);
  }
}

function handleTransactionSubmitAndNavigate(data) {
  handleTransactionSubmit(data);
  currentView.value = 'dashboard';
}

const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(t => t.id !== id);
  saveTransactionsToLocalStorage();
  toast.success("Transaction deleted");
};

const saveTransactionsToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
  localStorage.setItem("transactions_version", DEMO_VERSION);
};

provide('CATEGORIES', CATEGORIES);
provide('monthlyBudget', monthlyBudget);
provide('setBudget', setBudget);
provide('budgetStatus', budgetStatus);
provide('currentMonthExpenses', currentMonthExpenses);
provide('currentMonthIncome', currentMonthIncome);
provide('categorySummary', categorySummary);
provide('transactions', transformedData);
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

body {
  font-family: 'Inter', sans-serif;
  background-color: #0e0e0e;
  color: #fff;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.glass-panel {
  background: rgba(38, 38, 38, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #0e0e0e; }
::-webkit-scrollbar-thumb { background: #262626; border-radius: 10px; }
</style>
