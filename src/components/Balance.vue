<template>
  <div class="flex flex-col gap-4 p-4 bg-white border border-1 rounded-[20px] justify-center">
    <div class="text-sm justify-self-start">Current Balance</div>
    <h1 class="text-4xl font-bold text-center ">$ {{ total }}</h1>
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