<template>
  <div
    class="min-h-screen bg-[#0a0804] text-stone-200"
    style="font-family: 'Crimson Text', Georgia, serif"
  >
    <div
      class="pointer-events-none fixed inset-0 opacity-[0.03]"
      :style="{ backgroundImage: noiseUrl, backgroundSize: '200px 200px' }"
    ></div>
    <div class="h-px w-full bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="mb-16 text-center">
        <div class="mb-4 flex items-center justify-center gap-3 text-red-600">
          <div class="h-px w-16 bg-gradient-to-r from-transparent to-red-600"></div>
          <FlaskConical class="h-5 w-5" />
          <div class="h-px w-16 bg-gradient-to-l from-transparent to-red-600"></div>
        </div>
        <h1
          class="mb-3 text-6xl font-bold tracking-widest text-red-600"
          style="
            text-shadow:
              0 0 40px rgba(220, 38, 38, 0.4),
              0 2px 4px rgba(0, 0, 0, 0.8);
            letter-spacing: 0.15em;
          "
        >
          ITEMS
        </h1>
        <p class="mx-auto max-w-md text-lg italic text-stone-500">
          Relics and remedies scattered across the Lands Between
        </p>
        <div class="mt-6 flex items-center justify-center gap-3 text-red-700 opacity-60">
          <div class="h-px w-24 bg-gradient-to-r from-transparent to-red-700"></div>
          <div class="h-1.5 w-1.5 rotate-45 bg-red-700"></div>
          <div class="h-px w-24 bg-gradient-to-l from-transparent to-red-700"></div>
        </div>
      </div>

      <div class="mb-10 space-y-5">
        <div class="relative">
          <Search class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          <input
            v-model="query"
            @input="resetPage"
            placeholder="Search by name, type, or effect…"
            class="w-full rounded-sm border border-stone-700 bg-stone-900/60 py-2 pl-11 pr-4 text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-red-700"
          />
        </div>

        <div
          v-if="!loading"
          class="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4"
        >
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-widest text-stone-600">Type</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in types"
                :key="opt"
                @click="setFilter('type', opt)"
                :class="[PILL, typeFilter === opt ? PILL_ACTIVE : PILL_IDLE]"
              >
                {{ opt }}
              </button>
            </div>
          </div>

          <div class="h-px bg-stone-800"></div>

          <div class="space-y-2">
            <p class="text-xs uppercase tracking-widest text-stone-600">Effect</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in effectOptions"
                :key="opt"
                @click="setFilter('effect', opt)"
                :class="[PILL, effectFilter === opt ? PILL_ACTIVE : PILL_IDLE]"
              >
                {{ opt }}
              </button>
            </div>
          </div>

          <button
            v-if="hasActiveFilters"
            @click="resetFilters"
            class="flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-red-500"
          >
            <X class="h-3 w-3" /> Clear all filters
          </button>
        </div>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center gap-4 py-32">
        <Loader2 class="h-8 w-8 animate-spin text-red-700" />
        <p class="italic text-stone-600">Unearthing the relics…</p>
      </div>

      <div v-if="error" class="flex flex-col items-center justify-center gap-3 py-32">
        <Skull class="h-8 w-8 text-red-800" />
        <p class="italic text-red-700">The treasury remains sealed.</p>
        <p class="text-sm text-stone-600">{{ error }}</p>
      </div>

      <template v-if="!loading && !error">
        <div class="mb-6 flex items-center justify-between text-sm text-stone-600">
          <div class="flex items-center gap-2">
            <FlaskConical class="h-3.5 w-3.5" />
            <span>{{ filtered.length }} {{ filtered.length === 1 ? 'item' : 'items' }} found</span>
          </div>
          <span v-if="totalPages > 1">Page {{ page }} of {{ totalPages }}</span>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-if="paginated.length === 0"
            class="col-span-full py-24 text-center italic text-stone-600"
          >
            No item answers your call…
          </div>

          <div
            v-for="item in paginated"
            :key="item.id"
            @click="router.push(`/items/${item.id}`)"
            class="group cursor-pointer overflow-hidden rounded-sm border border-stone-800/60 bg-stone-900/30 transition-all duration-300 hover:border-red-900 hover:bg-stone-900/60"
          >
            <div class="relative h-56 w-full overflow-hidden bg-stone-950">
              <template v-if="item.image">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="h-full w-full object-cover opacity-75 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div
                  class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-900 to-transparent"
                ></div>
              </template>
              <div v-else class="flex h-full w-full items-center justify-center">
                <FlaskConical class="h-12 w-12 text-stone-800" />
              </div>
              <div v-if="item.type" class="absolute right-3 top-3">
                <span
                  :class="[
                    'rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm',
                    getTypeColor(item.type),
                  ]"
                  >{{ item.type }}</span
                >
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
                <div class="flex w-full items-start gap-1.5 text-left text-xs text-stone-600">
                  <Sparkles class="mt-0.5 h-3 w-3 flex-shrink-0 text-yellow-700" />
                  <span class="line-clamp-1">{{ item.effect }}</span>
                </div>
              </div>

              <div class="my-3 h-px bg-stone-800"></div>

              <div class="flex items-center justify-end">
                <ChevronRight
                  class="h-4 w-4 text-stone-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="totalPages > 1" class="mt-10 flex items-center justify-center gap-2">
          <button
            @click="page = Math.max(1, page - 1)"
            :disabled="page === 1"
            class="flex h-9 w-9 items-center justify-center rounded-sm border border-stone-800 bg-stone-900/40 text-stone-500 transition-all duration-200 hover:border-stone-600 hover:text-stone-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft class="h-4 w-4" />
          </button>
          <template v-for="(p, idx) in paginationPages" :key="idx">
            <span v-if="p === '...'" class="px-1 text-stone-700">…</span>
            <button
              v-else
              @click="page = p"
              :class="[
                'flex h-9 w-9 items-center justify-center rounded-sm border text-sm transition-all duration-200',
                page === p
                  ? 'border-red-800 bg-red-950 text-red-400'
                  : 'border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300',
              ]"
            >
              {{ p }}
            </button>
          </template>
          <button
            @click="page = Math.min(totalPages, page + 1)"
            :disabled="page === totalPages"
            class="flex h-9 w-9 items-center justify-center rounded-sm border border-stone-800 bg-stone-900/40 text-stone-500 transition-all duration-200 hover:border-stone-600 hover:text-stone-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>
      </template>

      <div class="mt-16 flex items-center justify-center gap-3 text-stone-800">
        <div class="h-px flex-1 bg-stone-900"></div>
        <FlaskConical class="h-4 w-4" />
        <div class="h-px flex-1 bg-stone-900"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  FlaskConical,
  Skull,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
} from 'lucide-vue-next'
import { getItems, type Item } from '@/api/Items'

const PAGE_SIZE = 9

const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
const PILL = 'rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer'
const PILL_ACTIVE = 'border-red-700 bg-red-950 text-red-400'
const PILL_IDLE =
  'border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300'
const effectOptions = ['All', 'Has Effect', 'No Effect']

function getTypeColor(type: string) {
  const t = type?.toLowerCase() ?? ''
  if (t.includes('consumable') || t.includes('flask'))
    return 'bg-emerald-950 text-emerald-400 border-emerald-800'
  if (t.includes('key')) return 'bg-yellow-950 text-yellow-400 border-yellow-800'
  if (t.includes('material') || t.includes('smith')) return 'bg-sky-950 text-sky-400 border-sky-800'
  if (t.includes('info') || t.includes('note'))
    return 'bg-violet-950 text-violet-400 border-violet-800'
  if (t.includes('bolstering') || t.includes('crystal'))
    return 'bg-orange-950 text-orange-400 border-orange-800'
  return 'bg-stone-900 text-stone-400 border-stone-700'
}

const router = useRouter()
const items = ref<Item[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const query = ref('')
const typeFilter = ref('All')
const effectFilter = ref('All')
const page = ref(1)

onMounted(async () => {
  try {
    items.value = await getItems()
    if (items.value.length === 0) throw new Error('No items found')
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})

const types = computed(() => [
  'All',
  ...Array.from(new Set(items.value.map((i) => i.type).filter(Boolean))).sort(),
])
function resetPage() {
  page.value = 1
}
function setFilter(type: string, val: string) {
  if (type === 'type') typeFilter.value = val
  else effectFilter.value = val
  page.value = 1
}
function resetFilters() {
  query.value = ''
  typeFilter.value = 'All'
  effectFilter.value = 'All'
  page.value = 1
}

const hasActiveFilters = computed(
  () => query.value !== '' || typeFilter.value !== 'All' || effectFilter.value !== 'All',
)

const filtered = computed(() =>
  items.value.filter((item) => {
    if (
      query.value &&
      !item.name.toLowerCase().includes(query.value.toLowerCase()) &&
      !item.type?.toLowerCase().includes(query.value.toLowerCase()) &&
      !item.effect?.toLowerCase().includes(query.value.toLowerCase()) &&
      !item.description?.toLowerCase().includes(query.value.toLowerCase())
    )
      return false
    if (typeFilter.value !== 'All' && item.type !== typeFilter.value) return false
    if (effectFilter.value === 'Has Effect' && !item.effect) return false
    if (effectFilter.value === 'No Effect' && item.effect) return false
    return true
  }),
)

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const paginated = computed(() =>
  filtered.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE),
)
const paginationPages = computed(() => {
  const pages = Array.from({ length: totalPages.value }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages.value || Math.abs(p - page.value) <= 1,
  )
  const result: (number | '...')[] = []
  pages.forEach((p, idx) => {
    if (idx > 0 && p - (pages[idx - 1] as number) > 1) result.push('...')
    result.push(p)
  })
  return result
})
</script>
