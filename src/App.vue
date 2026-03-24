<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
function increment() {
  count.value++
}
function decrement() {
  count.value--
}
function reset() {
  count.value = 0
}
</script>

<template>
  <main>
    <div class="flex flex-col items-center justify-center h-screen space-y-10">
      <button
        v-on:click="increment"
        class="border border-green-700 p-9 rounded-2xl shadow-2xl hover:bg-green-700 hover:text-white transition duration-300"
      >
        Increment
      </button>
      <button
        v-on:click="decrement"
        class="border border-yellow-700 p-9 rounded-2xl shadow-2xl hover:bg-yellow-700 hover:text-white transition duration-300"
      >
        Decrement
      </button>
      <button
        v-on:click="reset"
        class="border border-red-700 p-9 rounded-2xl shadow-2xl hover:bg-red-700 hover:text-white transition duration-300"
      >
        Reset
      </button>
      <div>
        <span class="text-2xl">Counter: {{ count }}</span>
      </div>
    </div>
  </main>
</template>
