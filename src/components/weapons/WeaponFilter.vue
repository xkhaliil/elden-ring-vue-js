<template>
  <div class="space-y-5">
    <div class="relative">
      <Search class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
      <input
        :value="query"
        @input="onQueryChange(($event.target as HTMLInputElement).value)"
        placeholder="Search by name, category, or scaling…"
        class="w-full rounded-sm border border-stone-700 bg-stone-900/60 py-2 pl-11 pr-4 text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-red-700 focus-visible:ring-red-900"
      />
    </div>

    <div class="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4">
      <div class="space-y-2">
        <p class="text-xs uppercase tracking-widest text-stone-600">Weight Class</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="opt in weightOptions"
            :key="opt"
            @click="onWeightChange(opt)"
            :class="[PILL, weightFilter === opt ? PILL_ACTIVE : PILL_IDLE]"
          >
            {{ opt }}
          </button>
        </div>
      </div>

      <div class="h-px bg-stone-800"></div>

      <div class="space-y-2">
        <p class="text-xs uppercase tracking-widest text-stone-600">Best Scaling</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="opt in scalingOptions"
            :key="opt"
            @click="onScalingChange(opt)"
            :class="[PILL, scalingFilter === opt ? PILL_ACTIVE : PILL_IDLE]"
          >
            {{ opt }}
          </button>
        </div>
      </div>

      <button
        v-if="hasActiveFilters"
        @click="onReset"
        class="flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-red-500"
      >
        <X class="h-3 w-3" />
        Clear filters
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Search, X } from 'lucide-vue-next'

export type WeightFilter = 'All' | 'Light' | 'Medium' | 'Heavy' | 'Colossal'
export type ScalingFilter = 'All' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E'

const props = defineProps<{
  query: string
  weightFilter: WeightFilter
  scalingFilter: ScalingFilter
}>()

const emit = defineEmits<{
  (e: 'update:query', value: string): void
  (e: 'update:weightFilter', value: WeightFilter): void
  (e: 'update:scalingFilter', value: ScalingFilter): void
  (e: 'reset'): void
}>()

const PILL = 'rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer'
const PILL_ACTIVE = 'border-red-700 bg-red-950 text-red-400'
const PILL_IDLE =
  'border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300'

const weightOptions: WeightFilter[] = ['All', 'Light', 'Medium', 'Heavy', 'Colossal']
const scalingOptions: ScalingFilter[] = ['All', 'S', 'A', 'B', 'C', 'D', 'E']

const hasActiveFilters = computed(
  () => props.query !== '' || props.weightFilter !== 'All' || props.scalingFilter !== 'All',
)

function onQueryChange(val: string) {
  emit('update:query', val)
}
function onWeightChange(val: WeightFilter) {
  emit('update:weightFilter', val)
}
function onScalingChange(val: ScalingFilter) {
  emit('update:scalingFilter', val)
}
function onReset() {
  emit('reset')
}
</script>
