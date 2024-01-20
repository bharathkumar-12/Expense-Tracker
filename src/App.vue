<template>
  <Header />
  <div class="container">
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
const transactions = ref([])
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
  transactions.value.push({
    id: generateUID(),
    text: transactionData.text,
    amount: transactionData.amount,
  })
  saveTransactionsToLocalStorage()
  toast.success('Transaction Added')
}
const generateUID = () => {
  return Math.floor(Math.random() * 1000000)
}
// const handleTransactionDeleted = (id) => {
//   transactions.value = transactions.value.filter((transaction) => {
//     return transaction.id !== id
//   })
//   saveTransactionsToLocalStorage()
//   toast.success("Transaction Deleted")
// }
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => {
    return transaction.id !== id;
  });
  saveTransactionsToLocalStorage();
  toast.success("Transaction Deleted");
};

const saveTransactionsToLocalStorage = ()=>{
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

</script>
