<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-foreground mb-8">Elden Ring Bosses</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="boss in bosses" :key="boss.name" class="bg-card">
          <CardHeader>
            <CardTitle class="text-foreground">{{ boss.name }}</CardTitle>
            <CardDescription class="text-muted-foreground">{{ boss.location }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{{ boss.description }}</p>
          </CardContent>
          <CardFooter>
            <Button class="w-full">View Details</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

defineOptions({
  name: 'ViewBosses',
})

const bosses = [
  {
    name: 'Margit, the Fell Omen',
    location: 'Stormveil Castle',
    description: 'A formidable boss encountered early in the game.',
  },
  {
    name: 'Godrick the Grafted',
    location: 'Stormveil Castle',
    description: 'Demigod boss who grafts limbs onto himself.',
  },
  {
    name: 'Rennala, Queen of the Full Moon',
    location: 'Raya Lucaria Academy',
    description: 'Powerful sorceress and shardbearer.',
  },
]
</script>
