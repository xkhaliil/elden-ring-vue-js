<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/navbar.vue'
import AppFooter from './components/footer.vue'
</script>
