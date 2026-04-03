<template>
  <div class="space-y-5">
    <div class="relative">
      <Search class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
      <input
        :value="query"
        @input="onQueryChange(($event.target as HTMLInputElement).value)"
        placeholder="Search by name, location, or drop…"
        class="w-full rounded-sm border border-stone-700 bg-stone-900/60 py-2 pl-11 pr-4 text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-red-700 focus-visible:ring-red-900"
      />
    </div>

    <div class="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4">
      <div class="space-y-2">
        <p class="text-xs uppercase tracking-widest text-stone-600">Difficulty</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="opt in difficultyOptions"
            :key="opt"
            @click="onDifficultyChange(opt)"
            :class="[PILL, difficulty === opt ? PILL_ACTIVE : PILL_IDLE]"
          >
            {{ opt }}
          </button>
        </div>
      </div>

      <div class="h-px bg-stone-800"></div>

      <div class="space-y-2">
        <p class="text-xs uppercase tracking-widest text-stone-600">Drops</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="opt in dropsOptions"
            :key="opt"
            @click="onDropsFilterChange(opt)"
            :class="[PILL, dropsFilter === opt ? PILL_ACTIVE : PILL_IDLE]"
          >
            {{ opt }}
          </button>
        </div>
      </div>

      <div class="h-px bg-stone-800"></div>

      <div class="space-y-2">
        <p class="text-xs uppercase tracking-widest text-stone-600">Health Points Range</p>
        <div class="flex items-center gap-3">
          <input
            :value="minHp"
            @input="onMinHpChange(($event.target as HTMLInputElement).value)"
            type="number"
            placeholder="Min HP"
            class="w-full rounded-sm border border-stone-700 bg-stone-900/60 px-3 py-2 text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-red-700 focus-visible:ring-red-900"
          />
          <span class="text-stone-700">—</span>
          <input
            :value="maxHp"
            @input="onMaxHpChange(($event.target as HTMLInputElement).value)"
            type="number"
            placeholder="Max HP"
            class="w-full rounded-sm border border-stone-700 bg-stone-900/60 px-3 py-2 text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-red-700 focus-visible:ring-red-900"
          />
        </div>
      </div>

      <button
        v-if="hasActiveFilters"
        @click="onReset"
        class="flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-red-500"
      >
        <X class="h-3 w-3" />
        Clear all filters
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Search, X } from 'lucide-vue-next'

export type DifficultyFilter = 'All' | 'Unknown' | 'Medium' | 'Hard' | 'Very Hard' | 'Extreme'
export type DropsFilter = 'All' | 'Has Drops' | 'No Drops'

const props = defineProps<{
  query: string
  difficulty: DifficultyFilter
  dropsFilter: DropsFilter
  minHp: string
  maxHp: string
}>()

const emit = defineEmits<{
  (e: 'update:query', value: string): void
  (e: 'update:difficulty', value: DifficultyFilter): void
  (e: 'update:dropsFilter', value: DropsFilter): void
  (e: 'update:minHp', value: string): void
  (e: 'update:maxHp', value: string): void
  (e: 'reset'): void
}>()

const PILL = 'rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer'
const PILL_ACTIVE = 'border-red-700 bg-red-950 text-red-400'
const PILL_IDLE =
  'border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300'

const difficultyOptions: DifficultyFilter[] = [
  'All',
  'Unknown',
  'Medium',
  'Hard',
  'Very Hard',
  'Extreme',
]
const dropsOptions: DropsFilter[] = ['All', 'Has Drops', 'No Drops']

const hasActiveFilters = computed(
  () =>
    props.query !== '' ||
    props.difficulty !== 'All' ||
    props.dropsFilter !== 'All' ||
    props.minHp !== '' ||
    props.maxHp !== '',
)

function onQueryChange(val: string) {
  emit('update:query', val)
}
function onDifficultyChange(val: DifficultyFilter) {
  emit('update:difficulty', val)
}
function onDropsFilterChange(val: DropsFilter) {
  emit('update:dropsFilter', val)
}
function onMinHpChange(val: string) {
  emit('update:minHp', val)
}
function onMaxHpChange(val: string) {
  emit('update:maxHp', val)
}
function onReset() {
  emit('reset')
}
</script>
