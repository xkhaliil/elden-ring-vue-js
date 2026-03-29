<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-foreground mb-8">Elden Ring Weapons</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="weapon in weapons" :key="weapon.name" class="bg-card">
          <CardHeader>
            <CardTitle class="text-foreground">{{ weapon.name }}</CardTitle>
            <CardDescription class="text-muted-foreground">{{ weapon.type }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{{ weapon.description }}</p>
            <div class="mt-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Attack Power:</span>
                <span class="text-foreground">{{ weapon.attack }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Weight:</span>
                <span class="text-foreground">{{ weapon.weight }}</span>
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

defineOptions({
  name: 'ViewWeapons'
})

const weapons = [
  {
    name: 'Uchigatana',
    type: 'Katana',
    description: 'A sharp katana with excellent bleed buildup.',
    attack: '115',
    weight: '5.5'
  },
  {
    name: 'Greatsword',
    type: 'Colossal Sword',
    description: 'A massive sword requiring great strength to wield.',
    attack: '164',
    weight: '23.0'
  },
  {
    name: 'Meteorite Staff',
    type: 'Glintstone Staff',
    description: 'A staff that boosts gravity sorceries.',
    attack: '39',
    weight: '4.4'
  }
]
</script>