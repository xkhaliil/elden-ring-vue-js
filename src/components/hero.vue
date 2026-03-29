<template>
  <div class="relative h-screen min-h-screen">
    <PixelLiquidBg :pixel-size="12" />

    <div class="absolute inset-0 flex items-center justify-center gap-10">
      <div class="flex flex-col items-center justify-center gap-3 p-8 px-4 text-start shadow-2xl">
        <div class="shadow-4xl flex flex-col text-6xl text-white max-sm:text-4xl">The</div>
        <div class="shadow-4xl flex flex-col text-6xl text-white max-sm:text-4xl">Elden</div>
        <div class="shadow-4xl flex flex-col text-6xl text-white max-sm:text-4xl">Ring</div>
        <div class="shadow-4xl flex flex-col text-6xl text-white max-sm:text-4xl">WiKi</div>
      </div>

      <div>
        <img
          src="@/assets/eldenring_transparent.webp"
          alt="Logo"
          width="200"
          height="347"
          fetchpriority="high"
          class="shadow-4xl transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>

    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 scale-110 transform animate-pulse rounded-full bg-black/20 p-3 shadow-2xl transition-transform duration-300 hover:scale-150"
      @click="scrollToCategories"
    >
      <img src="@/assets/arrow-down-01-stroke-rounded.svg" alt="Go Down" width="40" height="40" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PixelLiquidBg from '@/components/unlumen-ui/pixel-liquid-bg.vue'

defineOptions({
  name: 'AppHero',
})

function scrollToCategories() {
  const categoriesSection = document.getElementById('categories')
  if (categoriesSection) {
    categoriesSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
