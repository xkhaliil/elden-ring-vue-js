<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-foreground mb-8">Elden Ring Items</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="item in items" :key="item.name" class="bg-card">
          <CardHeader>
            <CardTitle class="text-foreground">{{ item.name }}</CardTitle>
            <CardDescription class="text-muted-foreground">{{ item.type }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{{ item.description }}</p>
            <div class="mt-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Effect:</span>
                <span class="text-foreground">{{ item.effect }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Duration:</span>
                <span class="text-foreground">{{ item.duration }}</span>
              </div>
            </div>
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const items = [
  {
    name: 'Flask of Crimson Tears',
    type: 'Consumable',
    description: 'Restores HP when consumed.',
    effect: 'Restores HP',
    duration: 'Instant'
  },
  {
    name: 'Rune Arc',
    type: 'Consumable',
    description: 'Activates the power of a Great Rune.',
    effect: 'Activates Great Rune',
    duration: 'Until death'
  },
  {
    name: 'Golden Rune [1]',
    type: 'Consumable',
    description: 'Grants runes when consumed.',
    effect: 'Grants 200 runes',
    duration: 'Instant'
  }
]
</script>