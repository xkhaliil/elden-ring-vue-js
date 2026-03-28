<template>
  <div id="app">
    <Navbar />
    <Hero />
    <Categories />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue'
import Hero from './components/hero.vue'
import Categories from './components/categories.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Hero,
    Categories,
  },
}
</script>
