<template>
  <Header />
  <div class="grid mx-auto max-w-[400px] gap-[24px] ">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmit="handleTransactionSubmit" />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import AddTransaction from "./components/AddTransaction.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import { ref, computed, onMounted } from 'vue';
import {useToast} from 'vue-toastification';

const toast = useToast();
const transactions = ref([
  {
    "id": 680174,
    "text": "Salary",
    "amount": 1200,
    "timestamp": "2024-01-21T07:37:55.307Z"
  },
  {
    "id": 163475,
    "text": "Books",
    "amount": -130,
    "timestamp": "2024-01-21T07:38:05.160Z"
  },
  {
    "id": 743702,
    "text": "TV",
    "amount": -450,
    "timestamp": "2024-01-21T07:38:36.140Z"
  },
  {
    "id": 383308,
    "text": "TV Subscription",
    "amount": -120,
    "timestamp": "2024-01-21T07:38:52.451Z"
  },
  {
    "id": 561289,
    "text": "Groceries",
    "amount": -80,
    "timestamp": "2024-01-21T07:39:15.802Z"
  },
  {
    "id": 927510,
    "text": "Gasoline",
    "amount": -35,
    "timestamp": "2024-01-21T07:39:40.643Z"
  },
  {
    "id": 216497,
    "text": "Dinner",
    "amount": -70,
    "timestamp": "2024-01-21T07:40:02.917Z"
  },
  {
    "id": 385692,
    "text": "Utilities",
    "amount": -150,
    "timestamp": "2024-01-21T07:40:25.789Z"
  },
  {
    "id": 759824,
    "text": "Internet Bill",
    "amount": -80,
    "timestamp": "2024-01-21T07:40:50.210Z"
  },
  {
    "id": 482136,
    "text": "Coffee",
    "amount": -5,
    "timestamp": "2024-01-21T07:41:15.112Z"
  },
  {
    "id": 643219,
    "text": "Lunch",
    "amount": -20,
    "timestamp": "2024-01-21T07:41:38.441Z"
  },
  {
    "id": 124578,
    "text": "Movie Tickets",
    "amount": -40,
    "timestamp": "2024-01-21T07:42:01.523Z"
  },
  {
    "id": 895267,
    "text": "Fitness Class",
    "amount": -100,
    "timestamp": "2024-01-21T07:42:25.876Z"
  },
  {
    "id": 376590,
    "text": "Clothing",
    "amount": -200,
    "timestamp": "2024-01-21T07:42:49.209Z"
  },
  {
    "id": 652413,
    "text": "Phone Bill",
    "amount": -50,
    "timestamp": "2024-01-21T07:43:13.652Z"
  },
  {
    "id": 415726,
    "text": "Gift",
    "amount": -30,
    "timestamp": "2024-01-21T07:43:38.105Z"
  },
  {
    "id": 789042,
    "text": "Car Maintenance",
    "amount": -120,
    "timestamp": "2024-01-21T07:44:03.008Z"
  },
  {
    "id": 548391,
    "text": "Travel Expenses",
    "amount": -180,
    "timestamp": "2024-01-21T07:44:27.451Z"
  },
  {
    "id": 109634,
    "text": "Gym Membership",
    "amount": -70,
    "timestamp": "2024-01-21T07:44:51.804Z"
  },
  {
    "id": 870155,
    "text": "Rent",
    "amount": -1000,
    "timestamp": "2024-01-21T07:45:16.257Z"
  }
])
// get total
const total = computed(()=>{
  return transactions.value.reduce((acc, transaction)=>{
    return acc + transaction.amount
  },0).toFixed(2)
})

onMounted(()=>{
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))
  if(savedTransactions){
    transactions.value = savedTransactions;
  }
})
// get income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => {
      return transaction.amount > 0
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})
// get expense
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => {
      return transaction.amount < 0
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})
const handleTransactionSubmit = (transactionData) => {
  const timestamp = new Date();
  transactions.value.push({
    id: generateUID(),
    text: transactionData.text,
    amount: transactionData.amount,
    timestamp: timestamp.toISOString(),
  })
  saveTransactionsToLocalStorage()
  toast.success(`${transactionData.text} Transaction Added`)
}
const generateUID = () => {
  return Math.floor(Math.random() * 1000000)
}
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => {
    return transaction.id !== id;
  });
  saveTransactionsToLocalStorage();
  toast.success(`${id} Transaction Deleted`);
};

const saveTransactionsToLocalStorage = ()=>{
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
</style>