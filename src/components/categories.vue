<template>
  <div
    id="categories"
    class="mt-56 flex h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-[#080A0A] to-[#240000] pb-96 md:mt-0 md:pb-44"
  >
    <h1 class="text-4xl font-bold text-white">Categories</h1>
    <div class="grid grid-cols-1 gap-6 p-3 md:grid-cols-3">
      <Card
        v-for="category in categories"
        :key="category.title"
        class="relative mx-auto w-full max-w-sm justify-between pt-0"
      >
        <div class="absolute inset-0 z-30 aspect-video bg-black/35"></div>
        <img
          :src="category.image"
          alt="Event cover"
          class="relative z-20 aspect-video w-full object-cover brightness-50 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardTitle>{{ category.title }}</CardTitle>
          <CardDescription>{{ category.description }}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button class="w-full" @click="router.push(category.href)">
            {{ category.label }}
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import bossesImg from '@/assets/bosses.jpg'
import weaponsImg from '@/assets/weapons.jpg'
import itemsImg from '@/assets/items.jpg'

defineOptions({
  name: 'AppCategories',
})
const router = useRouter()

const categories = [
  {
    title: 'Bosses',
    description: 'Explore the bosses of Elden Ring',
    label: 'Search Bosses',
    href: '/bosses',
    image: bossesImg,
  },
  {
    title: 'Weapons',
    description: 'Explore the weapons of Elden Ring',
    label: 'Search Weapons',
    href: '/weapons',
    image: weaponsImg,
  },
  {
    title: 'Items',
    description: 'Explore the items of Elden Ring',
    label: 'Search Items',
    href: '/items',
    image: itemsImg,
  },
]
</script>
