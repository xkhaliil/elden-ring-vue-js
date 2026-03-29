<template>
  <div id="app">
    <Navbar />

    <main>
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script>
import Navbar from './components/navbar.vue'
import Footer from './components/footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
}
</script>
