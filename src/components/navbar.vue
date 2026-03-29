<template>
  <nav class="sticky top-0 z-50 border-b border-stone-800 bg-stone-950/80 backdrop-blur-md">
    <div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo & Home Link -->
      <router-link to="/" class="flex items-center gap-3 transition-opacity hover:opacity-80">
        <img
          src="@/assets/navbar-logo.webp"
          alt="Elden Ring Logo"
          class="h-10 w-10 object-contain"
        />
        <span class="font-serif text-lg tracking-wider text-stone-200">The Lands Between</span>
      </router-link>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center gap-8">
        <router-link
          to="/bosses"
          class="text-sm font-medium text-stone-400 transition-colors hover:text-stone-200"
          >Bosses</router-link
        >
        <router-link
          to="/weapons"
          class="text-sm font-medium text-stone-400 transition-colors hover:text-stone-200"
          >Weapons</router-link
        >
        <router-link
          to="/items"
          class="text-sm font-medium text-stone-400 transition-colors hover:text-stone-200"
          >Items</router-link
        >
      </div>
      <!-- Theme Toggle -->
      <button
        @click="toggleDarkMode"
        class="rounded-full p-2 text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors"
        aria-label="Toggle Dark Mode"
      >
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode'

defineOptions({
  name: 'AppNavbar',
})

const { isDark, toggleDarkMode } = useDarkMode()
</script>
