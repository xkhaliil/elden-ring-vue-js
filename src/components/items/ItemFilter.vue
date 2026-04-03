<template>
  <div class="space-y-5">
    <div class="relative">
      <Search class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
      <input
        :value="query"
        @input="onQueryChange(($event.target as HTMLInputElement).value)"
        placeholder="Search by name, type, or effect…"
        class="w-full rounded-sm border border-stone-700 bg-stone-900/60 py-2 pl-11 pr-4 text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-red-700 focus-visible:ring-red-900"
      />
    </div>

    <div class="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4">
      <div class="space-y-2">
        <p class="text-xs uppercase tracking-widest text-stone-600">Category</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="opt in typeOptions"
            :key="opt"
            @click="onTypeChange(opt)"
            :class="[PILL, typeFilter === opt ? PILL_ACTIVE : PILL_IDLE]"
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

export type ItemTypeFilter =
  | 'All'
  | 'Consumable'
  | 'Key Item'
  | 'Material'
  | 'Info'
  | 'Bolstering'
  | 'Other'

const props = defineProps<{
  query: string
  typeFilter: ItemTypeFilter
}>()

const emit = defineEmits<{
  (e: 'update:query', value: string): void
  (e: 'update:typeFilter', value: ItemTypeFilter): void
  (e: 'reset'): void
}>()

const PILL = 'rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer'
const PILL_ACTIVE = 'border-red-700 bg-red-950 text-red-400'
const PILL_IDLE =
  'border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300'

const typeOptions: ItemTypeFilter[] = [
  'All',
  'Consumable',
  'Key Item',
  'Material',
  'Info',
  'Bolstering',
  'Other',
]

const hasActiveFilters = computed(() => props.query !== '' || props.typeFilter !== 'All')

function onQueryChange(val: string) {
  emit('update:query', val)
}
function onTypeChange(val: ItemTypeFilter) {
  emit('update:typeFilter', val)
}
function onReset() {
  emit('reset')
}
</script>
