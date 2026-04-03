<template>
  <div
    class="min-h-screen bg-[#0a0804] text-stone-200"
    style="font-family: 'Crimson Text', Georgia, serif"
  >
    <div
      class="pointer-events-none fixed inset-0 opacity-[0.03]"
      :style="{ backgroundImage: noiseUrl, backgroundSize: '200px 200px' }"
    ></div>

    <div class="h-px w-full bg-linear-to-r from-transparent via-red-600 to-transparent"></div>

    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="mb-16 text-center">
        <div class="mb-4 flex items-center justify-center gap-3 text-red-600">
          <div class="h-px w-16 bg-linear-to-r from-transparent to-red-600"></div>
          <Skull class="h-5 w-5" />
          <div class="h-px w-16 bg-linear-to-l from-transparent to-red-600"></div>
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
          BOSSES
        </h1>
        <p class="mx-auto max-w-md text-lg italic text-stone-500">Legends of the Shattered Realm</p>
        <div class="mt-6 flex items-center justify-center gap-3 text-red-700 opacity-60">
          <div class="h-px w-24 bg-linear-to-r from-transparent to-red-700"></div>
          <div class="h-1.5 w-1.5 rotate-45 bg-red-700"></div>
          <div class="h-px w-24 bg-linear-to-l from-transparent to-red-700"></div>
        </div>
      </div>

      <div class="mb-10 space-y-5">
        <div class="relative">
          <Search class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          <input
            v-model="query"
            @input="resetPage"
            placeholder="Search by name, location, or drop…"
            class="w-full rounded-sm border border-stone-700 bg-stone-900/60 py-2 pl-11 pr-4 text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-red-700"
          />
        </div>

        <div
          v-if="!loading"
          class="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4"
        >
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-widest text-stone-600">Difficulty</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in difficultyOptions"
                :key="opt"
                @click="setFilter('difficulty', opt)"
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
                @click="setFilter('drops', opt)"
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
                v-model="minHp"
                @input="resetPage"
                type="number"
                placeholder="Min HP"
                class="w-full rounded-sm border border-stone-700 bg-stone-900/60 px-3 py-2 text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-red-700"
              />
              <span class="text-stone-700">—</span>
              <input
                v-model="maxHp"
                @input="resetPage"
                type="number"
                placeholder="Max HP"
                class="w-full rounded-sm border border-stone-700 bg-stone-900/60 px-3 py-2 text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-red-700"
              />
            </div>
          </div>

          <button
            v-if="hasActiveFilters"
            @click="resetFilters"
            class="flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-red-500"
          >
            <X class="h-3 w-3" />
            Clear all filters
          </button>
        </div>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center gap-4 py-32">
        <Loader2 class="h-8 w-8 animate-spin text-red-700" />
        <p class="italic text-stone-600">Summoning the fallen…</p>
      </div>

      <div v-if="error" class="flex flex-col items-center justify-center gap-3 py-32">
        <Skull class="h-8 w-8 text-red-800" />
        <p class="italic text-red-700">The fog gate remains sealed.</p>
        <p class="text-sm text-stone-600">{{ error }}</p>
      </div>

      <template v-if="!loading && !error">
        <div class="mb-6 flex items-center justify-between text-sm text-stone-600">
          <div class="flex items-center gap-2">
            <Swords class="h-3.5 w-3.5" />
            <span
              >{{ filtered.length }} {{ filtered.length === 1 ? 'enemy' : 'enemies' }} found</span
            >
          </div>
          <span v-if="totalPages > 1">Page {{ page }} of {{ totalPages }}</span>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-if="paginated.length === 0"
            class="col-span-full py-24 text-center italic text-stone-600"
          >
            No boss answers your call…
          </div>

          <div
            v-for="boss in paginated"
            :key="boss.id"
            @click="router.push(`/bosses/${boss.id}`)"
            class="group cursor-pointer overflow-hidden rounded-sm border border-stone-800/60 bg-stone-900/30 transition-all duration-300 hover:border-red-900 hover:bg-stone-900/60"
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
                    getDifficulty(boss.healthPoints).color,
                  ]"
                >
                  <span
                    :class="['h-1.5 w-1.5 rounded-full', getDifficulty(boss.healthPoints).dot]"
                  ></span>
                  {{ getDifficulty(boss.healthPoints).label }}
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
        <Skull class="h-4 w-4" />
        <div class="h-px flex-1 bg-stone-900"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Skull,
  Swords,
  Search,
  Shield,
  Flame,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
} from 'lucide-vue-next'
import { getBosses, type Boss } from '@/api/bosses'

const PAGE_SIZE = 9

const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const PILL = 'rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer'
const PILL_ACTIVE = 'border-red-700 bg-red-950 text-red-400'
const PILL_IDLE =
  'border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300'

const difficultyOptions = ['All', 'Unknown', 'Medium', 'Hard', 'Very Hard', 'Extreme']
const dropsOptions = ['All', 'Has Drops', 'No Drops']

function getDifficulty(hp: number) {
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
}

const router = useRouter()
const bosses = ref<Boss[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const query = ref('')
const difficulty = ref('All')
const dropsFilter = ref('All')
const minHp = ref('')
const maxHp = ref('')
const page = ref(1)

onMounted(async () => {
  try {
    bosses.value = await getBosses()
    if (bosses.value.length === 0) throw new Error('No bosses found')
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})

function resetPage() {
  page.value = 1
}
function setFilter(type: 'difficulty' | 'drops', val: string) {
  if (type === 'difficulty') difficulty.value = val
  else dropsFilter.value = val
  page.value = 1
}
function resetFilters() {
  query.value = ''
  difficulty.value = 'All'
  dropsFilter.value = 'All'
  minHp.value = ''
  maxHp.value = ''
  page.value = 1
}

const hasActiveFilters = computed(
  () =>
    query.value !== '' ||
    difficulty.value !== 'All' ||
    dropsFilter.value !== 'All' ||
    minHp.value !== '' ||
    maxHp.value !== '',
)

const filtered = computed(() => {
  const min = minHp.value !== '' ? Number(minHp.value) : null
  const max = maxHp.value !== '' ? Number(maxHp.value) : null
  return bosses.value.filter((boss) => {
    const diff = getDifficulty(boss.healthPoints)
    if (
      query.value &&
      !boss.name.toLowerCase().includes(query.value.toLowerCase()) &&
      !boss.location?.toLowerCase().includes(query.value.toLowerCase()) &&
      !boss.drops?.some((d) => d.toLowerCase().includes(query.value.toLowerCase()))
    )
      return false
    if (difficulty.value !== 'All' && diff.label !== difficulty.value) return false
    if (dropsFilter.value === 'Has Drops' && (!boss.drops || boss.drops.length === 0)) return false
    if (dropsFilter.value === 'No Drops' && boss.drops && boss.drops.length > 0) return false
    if (min !== null && boss.healthPoints < min) return false
    if (max !== null && boss.healthPoints > max) return false
    return true
  })
})

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
