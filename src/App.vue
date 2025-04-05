<template>
	<div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
		<div class="max-w-[1440px] mx-auto w-full">
			<Header />
			<div class="grid gap-6 p-4 lg:px-16">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div class="flex flex-col gap-4 bg-gray-800/50 backdrop-blur-lg rounded-2xl py-6 px-8 border border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300">
						<Balance :total="+total" />
						<IncomeExpenses :income="+income" :expenses="+expenses" />
					</div>
					<TransactionList
						:transactions="transactions"
						@transactionDeleted="handleTransactionDeleted"
						class="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 shadow-xl"
					/>
					<AddTransaction 
						@transactionSubmit="handleTransactionSubmit"
						class="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 shadow-xl"
					/>
					<RecentTransactionList 
						:transactions="transactions"
						class="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 shadow-xl"
					/>
				</div>
			</div>
			<Footer class="mt-auto" />
		</div>
	</div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Balance from "./components/Balance.vue";
import AddTransaction from "./components/AddTransaction.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import RecentTransactionList from "./components/RecentTransactionList.vue";
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { provide } from 'vue';

const toast = useToast();
const transactions = ref([
    // Income - Wave pattern with gentle rises and falls
    { id: 680174, text: "Salary", amount: 180, timestamp: "2024-01-01T10:00:00.000Z" },
    { id: 293874, text: "Freelance Project", amount: 190, timestamp: "2024-01-03T10:00:00.000Z" },
    { id: 837465, text: "Part-Time Job", amount: 210, timestamp: "2024-01-05T10:00:00.000Z" },
    { id: 123456, text: "Investment Dividends", amount: 200, timestamp: "2024-01-08T10:00:00.000Z" },
    { id: 283764, text: "Freelance Project", amount: 220, timestamp: "2024-01-10T10:00:00.000Z" },
    { id: 947365, text: "Side Business", amount: 210, timestamp: "2024-01-13T10:00:00.000Z" },
    { id: 473829, text: "Freelance Project", amount: 200, timestamp: "2024-01-15T10:00:00.000Z" },
    { id: 567829, text: "Consulting", amount: 220, timestamp: "2024-01-18T10:00:00.000Z" },
    { id: 876342, text: "Investment Dividends", amount: 190, timestamp: "2024-01-20T10:00:00.000Z" },
    { id: 657329, text: "Freelance Project", amount: 180, timestamp: "2024-01-23T10:00:00.000Z" },
    { id: 473829, text: "Part-Time Job", amount: 210, timestamp: "2024-01-25T10:00:00.000Z" },
    { id: 983742, text: "Consulting", amount: 190, timestamp: "2024-01-28T10:00:00.000Z" },
    { id: 738942, text: "Side Business", amount: 180, timestamp: "2024-01-30T10:00:00.000Z" },

    // Expenses - Wave pattern with smooth rises and falls
    { id: 163475, text: "Rent", amount: -100, timestamp: "2024-01-02T10:00:00.000Z" },
    { id: 743702, text: "Groceries", amount: -120, timestamp: "2024-01-04T10:00:00.000Z" },
    { id: 382374, text: "Electricity Bill", amount: -110, timestamp: "2024-01-06T10:00:00.000Z" },
    { id: 385692, text: "Internet Bill", amount: -100, timestamp: "2024-01-09T10:00:00.000Z" },
    { id: 758294, text: "Dining Out", amount: -90, timestamp: "2024-01-11T18:00:00.000Z" },
    { id: 163468, text: "Coffee", amount: -85, timestamp: "2024-01-14T09:00:00.000Z" },
    { id: 387492, text: "Transportation", amount: -95, timestamp: "2024-01-16T07:30:00.000Z" },
    { id: 392847, text: "Gym Membership", amount: -90, timestamp: "2024-01-19T07:00:00.000Z" },
    { id: 847362, text: "Movie Tickets", amount: -80, timestamp: "2024-01-21T20:00:00.000Z" },
    { id: 758934, text: "Online Shopping", amount: -100, timestamp: "2024-01-23T11:00:00.000Z" },
    { id: 647293, text: "Phone Bill", amount: -90, timestamp: "2024-01-25T12:00:00.000Z" },
    { id: 123789, text: "Gift", amount: -85, timestamp: "2024-01-27T08:00:00.000Z" },
    { id: 475839, text: "Lunch", amount: -70, timestamp: "2024-01-29T13:00:00.000Z" },
    { id: 827364, text: "Utilities", amount: -80, timestamp: "2024-01-31T07:00:00.000Z" }
]);
// get total
const total = computed(() => {
	return transactions.value
		.reduce((acc, transaction) => {
			return acc + transaction.amount;
		}, 0)
		.toFixed(2);
});

const transformedData = computed(() => {
  return transactions.value.map(({ amount, timestamp }) => {
    const day = new Date(timestamp).toISOString().split('T')[0]; // Format as "YYYY-MM-DD"

    // Determine income and expense based on the amount's sign
    const income = amount > 0 ? amount : 0;
    const expense = amount < 0 ? Math.abs(amount) : 0;

    return [day, income, expense];
  });
});

onMounted(() => {
	const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
	if (savedTransactions) {
		transactions.value = savedTransactions;
	}
});
// get income
const income = computed(() => {
	return transactions.value
		.filter((transaction) => {
			return transaction.amount > 0;
		})
		.reduce((acc, transaction) => {
			return acc + transaction.amount;
		}, 0)
		.toFixed(2);
});
// get expense
const expenses = computed(() => {
	return transactions.value
		.filter((transaction) => {
			return transaction.amount < 0;
		})
		.reduce((acc, transaction) => {
			return acc + transaction.amount;
		}, 0)
		.toFixed(2);
});
function handleTransactionSubmit({ text, amount, type_of_transaction }){
	if(type_of_transaction === 'Expense'){
		amount = amount * -1
	}
	console.log('expesne or not', amount, typeof amount)
    transactions.value.push({
        id: generateUID(),
        text,
        amount,
        type_of_transaction,
        timestamp: new Date().toISOString(),
    });
    saveTransactionsToLocalStorage();
    toast.success(`${text} Transaction Added`);
}


const generateUID = () => {
	return Math.floor(Math.random() * 1000000);
};
const handleTransactionDeleted = (id) => {
	transactions.value = transactions.value.filter((transaction) => {
		return transaction.id !== id;
	});
	saveTransactionsToLocalStorage();
	toast.success(`${id} Transaction Deleted`);
};

const saveTransactionsToLocalStorage = () => {
	localStorage.setItem("transactions", JSON.stringify(transactions.value));
};

provide('transactions', transformedData);
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

:root {
	--primary-color: #6366f1;
	--success-color: #10b981;
	--danger-color: #ef4444;
	--card-bg: rgba(31, 41, 55, 0.5);
}

body {
	font-family: 'Inter', sans-serif;
	background-color: #111827;
	color: #fff;
}

/* Add smooth transitions */
.transition-all {
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 300ms;
}

/* Glass effect for cards */
.glass-card {
	background: var(--card-bg);
	backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Custom scrollbar */
::-webkit-scrollbar {
	width: 8px;
}

::-webkit-scrollbar-track {
	background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.2);
	border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
	background: rgba(255, 255, 255, 0.3);
}
</style>
