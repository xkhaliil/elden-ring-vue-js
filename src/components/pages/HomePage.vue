<template>
  <div>
    <Hero />
    <Categories />
  </div>
</template>

<script>
import Hero from '@/components/hero.vue'
import Categories from '@/components/categories.vue'

export default {
  name: 'HomePage',
  components: {
    Hero,
    Categories
  }
}
</script>
