<template>
  <div
    class="group cursor-pointer overflow-hidden rounded-sm border border-stone-800/60 bg-stone-900/30 transition-all duration-300 hover:border-red-900 hover:bg-stone-900/60"
    @click="$emit('click')"
  >
    <div class="relative h-56 w-full overflow-hidden bg-stone-950">
      <template v-if="item.image">
        <img
          :src="item.image"
          :alt="item.name"
          class="h-full w-full object-cover opacity-75 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
        />
        <div
          class="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-stone-900 to-transparent"
        ></div>
      </template>
      <div v-else class="flex h-full w-full items-center justify-center">
        <FlaskConical class="h-12 w-12 text-stone-800" />
      </div>

      <div v-if="item.type" class="absolute right-3 top-3">
        <span :class="['rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm', typeColor]">
          {{ item.type }}
        </span>
      </div>
    </div>

    <div class="px-4 py-4">
      <h2
        class="mb-1 text-base font-semibold leading-tight text-stone-100 transition-colors group-hover:text-red-300"
      >
        {{ item.name }}
      </h2>

      <p class="mb-3 line-clamp-2 text-xs italic text-stone-500">
        {{ item.description || 'No lore recorded.' }}
      </p>

      <div v-if="item.effect" class="mb-3">
        <button
          @click.stop="isExpanded = !isExpanded"
          class="flex w-full items-start gap-1.5 text-left text-xs text-stone-600 transition-colors hover:text-stone-400"
        >
          <Sparkles class="mt-0.5 h-3 w-3 shrink-0 text-yellow-700" />
          <span :class="{ 'line-clamp-1': !isExpanded }">
            {{ item.effect }}
          </span>
          <ChevronDown
            :class="[
              'ml-auto h-3 w-3 shrink-0 transition-transform duration-200',
              isExpanded ? 'rotate-180' : '',
            ]"
          />
        </button>
      </div>

      <div class="my-3 h-px bg-stone-800"></div>

      <div class="flex items-center justify-end">
        <ChevronRight
          class="h-4 w-4 text-stone-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red-700"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FlaskConical, Sparkles, ChevronDown, ChevronRight } from 'lucide-vue-next'
import type { Item } from '@/api/Items'

const props = defineProps<{
  item: Item
}>()

defineEmits<{
  (e: 'click'): void
}>()

const isExpanded = ref(false)

const typeColor = computed(() => {
  const t = props.item.type?.toLowerCase() ?? ''
  if (t.includes('consumable') || t.includes('flask'))
    return 'bg-emerald-950 text-emerald-400 border-emerald-800'
  if (t.includes('key')) return 'bg-yellow-950 text-yellow-400 border-yellow-800'
  if (t.includes('material') || t.includes('smith')) return 'bg-sky-950 text-sky-400 border-sky-800'
  if (t.includes('info') || t.includes('note'))
    return 'bg-violet-950 text-violet-400 border-violet-800'
  if (t.includes('bolstering') || t.includes('crystal'))
    return 'bg-orange-950 text-orange-400 border-orange-800'
  return 'bg-stone-900 text-stone-400 border-stone-700'
})
</script>
