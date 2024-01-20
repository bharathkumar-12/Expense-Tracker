<template>
  <div class="grid p-[24px] bg-blue-50 rounded-[12px] justify-center">
    <div class="text-sm justify-self-start">Your Balance</div>
    <h1 class="text-4xl font-bold">$ {{ total }}</h1>
  </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    total:{
      type:Number,
      required: true,
    }
  })
  </script>
  
  <style>
  
  </style>