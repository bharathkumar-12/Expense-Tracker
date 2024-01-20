

<template>
  <Header />
  <div class="container">
    <Balance />
    <IncomeExpenses />

  </div>
  <!-- <Header />
  <Balance />
  <AddTransaction />
  <IncomeExpenses />
  <TransactionList /> -->

</template>

<script>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import AddTransaction from './components/AddTransaction.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue'


export default{
  components:{
    Header,
    Balance,
    AddTransaction,
    IncomeExpenses,
    TransactionList,

  }
}

</script>

