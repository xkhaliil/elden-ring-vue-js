<template>
  <div class="absolute top-0 left-0 z-10 w-full">
    <div class="flex h-24 w-full items-center justify-between px-4">
      <div>
        <RouterLink to="/">
          <img src="/src/assets/navbar-logo.webp" alt="Logo" width="60" height="60" />
        </RouterLink>
      </div>
      <div class="mr-4 flex items-center space-x-4">
        <RouterLink to="/bosses" class="text-foreground hover:text-muted-foreground"
          >Bosses</RouterLink
        >
        <RouterLink to="/weapons" class="text-foreground hover:text-muted-foreground"
          >Weapons</RouterLink
        >
        <RouterLink to="/items" class="text-foreground hover:text-muted-foreground"
          >Items</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
</script>
