<template>
  <div
    class="group cursor-pointer overflow-hidden rounded-sm border border-stone-800/60 bg-stone-900/30 transition-all duration-300 hover:border-red-900 hover:bg-stone-900/60"
    @click="$emit('click')"
  >
    <div class="relative h-56 w-full overflow-hidden bg-stone-950">
      <template v-if="boss.image">
        <img
          :src="boss.image"
          :alt="boss.name"
          class="h-full w-full object-cover opacity-75 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
        />
        <div
          class="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-stone-900 to-transparent"
        ></div>
      </template>
      <div v-else class="flex h-full w-full items-center justify-center">
        <Skull class="h-12 w-12 text-stone-800" />
      </div>

      <div class="absolute right-3 top-3">
        <span
          :class="[
            'flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm',
            difficulty.color,
          ]"
        >
          <span :class="['h-1.5 w-1.5 rounded-full', difficulty.dot]"></span>
          {{ difficulty.label }}
        </span>
      </div>
    </div>

    <div class="px-4 py-4">
      <h2
        class="mb-1 text-base font-semibold leading-tight text-stone-100 transition-colors group-hover:text-red-300"
      >
        {{ boss.name }}
      </h2>
      <p class="mb-3 line-clamp-2 text-xs italic text-stone-500">
        {{ boss.description || 'No lore recorded.' }}
      </p>
      <div class="flex flex-col gap-1.5 text-xs text-stone-600">
        <span v-if="boss.location" class="flex items-center gap-1.5">
          <Shield class="h-3 w-3 flex-shrink-0" />
          <span class="truncate">{{ boss.location }}</span>
        </span>
        <span v-if="boss.drops?.length" class="flex items-start gap-1.5">
          <Flame class="mt-0.5 h-3 w-3 flex-shrink-0 text-orange-700" />
          <span class="line-clamp-1">
            {{ boss.drops.slice(0, 2).join(', ')
            }}{{ boss.drops.length > 2 ? ` +${boss.drops.length - 2} more` : '' }}
          </span>
        </span>
      </div>

      <div class="my-3 h-px bg-stone-800"></div>

      <div class="flex items-center justify-between">
        <span v-if="boss.healthPoints > 0" class="text-xs text-stone-600">
          {{ boss.healthPoints.toLocaleString() }} <span class="text-stone-700">HP</span>
        </span>
        <span v-else></span>
        <ChevronRight
          class="h-4 w-4 text-stone-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red-700"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Skull, Shield, Flame, ChevronRight } from 'lucide-vue-next'
import type { Boss } from '@/api/bosses'

const props = defineProps<{
  boss: Boss
}>()

defineEmits<{
  (e: 'click'): void
}>()

const difficulty = computed(() => {
  const hp = props.boss.healthPoints
  if (!hp || hp === 0)
    return {
      label: 'Unknown',
      color: 'bg-stone-900 text-stone-400 border-stone-700',
      dot: 'bg-stone-400',
    }
  if (hp < 3000)
    return {
      label: 'Medium',
      color: 'bg-emerald-950 text-emerald-400 border-emerald-800',
      dot: 'bg-emerald-400',
    }
  if (hp < 7000)
    return {
      label: 'Hard',
      color: 'bg-amber-950 text-amber-400 border-amber-800',
      dot: 'bg-amber-400',
    }
  if (hp < 12000)
    return {
      label: 'Very Hard',
      color: 'bg-orange-950 text-orange-400 border-orange-800',
      dot: 'bg-orange-400',
    }
  return { label: 'Extreme', color: 'bg-red-950 text-red-400 border-red-800', dot: 'bg-red-500' }
})
</script>
