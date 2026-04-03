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
          <Swords class="h-5 w-5" />
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
          WEAPONS
        </h1>
        <p class="mx-auto max-w-md text-lg italic text-stone-500">
          Instruments of ruin, forged in the Lands Between
        </p>
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
            placeholder="Search by name, category, or description…"
            class="w-full rounded-sm border border-stone-700 bg-stone-900/60 py-2 pl-11 pr-4 text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-red-700"
          />
        </div>

        <div
          v-if="!loading"
          class="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4"
        >
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-widest text-stone-600">Category</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in categories"
                :key="opt"
                @click="setFilter('category', opt)"
                :class="[PILL, category === opt ? PILL_ACTIVE : PILL_IDLE]"
              >
                {{ opt }}
              </button>
            </div>
          </div>

          <div class="h-px bg-stone-800"></div>

          <div class="space-y-2">
            <p class="text-xs uppercase tracking-widest text-stone-600">Weight Class</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in weightOptions"
                :key="opt"
                @click="setFilter('weight', opt)"
                :class="[PILL, weightClass === opt ? PILL_ACTIVE : PILL_IDLE]"
              >
                {{ opt }}
              </button>
            </div>
          </div>

          <div class="h-px bg-stone-800"></div>

          <div class="space-y-2">
            <p class="text-xs uppercase tracking-widest text-stone-600">Best Scaling Grade</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in scalingOptions"
                :key="opt"
                @click="setFilter('scaling', opt)"
                :class="[PILL, scalingFilter === opt ? PILL_ACTIVE : PILL_IDLE]"
              >
                {{ opt }}
              </button>
            </div>
          </div>

          <div class="h-px bg-stone-800"></div>

          <div class="space-y-2">
            <p class="text-xs uppercase tracking-widest text-stone-600">Min Attack Power</p>
            <div class="w-48">
              <input
                v-model="minAttack"
                @input="resetPage"
                type="number"
                placeholder="e.g. 100"
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
        <p class="italic text-stone-600">Forging the arsenal…</p>
      </div>

      <div v-if="error" class="flex flex-col items-center justify-center gap-3 py-32">
        <Swords class="h-8 w-8 text-red-800" />
        <p class="italic text-red-700">The armory remains sealed.</p>
        <p class="text-sm text-stone-600">{{ error }}</p>
      </div>

      <template v-if="!loading && !error">
        <div class="mb-6 flex items-center justify-between text-sm text-stone-600">
          <div class="flex items-center gap-2">
            <Swords class="h-3.5 w-3.5" />
            <span
              >{{ filtered.length }} {{ filtered.length === 1 ? 'weapon' : 'weapons' }} found</span
            >
          </div>
          <span v-if="totalPages > 1">Page {{ page }} of {{ totalPages }}</span>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-if="paginated.length === 0"
            class="col-span-full py-24 text-center italic text-stone-600"
          >
            No weapon answers your call…
          </div>

          <div
            v-for="weapon in paginated"
            :key="weapon.id"
            @click="router.push(`/weapons/${weapon.id}`)"
            class="group cursor-pointer overflow-hidden rounded-sm border border-stone-800/60 bg-stone-900/30 transition-all duration-300 hover:border-red-900 hover:bg-stone-900/60"
          >
            <div class="relative h-56 w-full overflow-hidden bg-stone-950">
              <template v-if="weapon.image">
                <img
                  :src="weapon.image"
                  :alt="weapon.name"
                  class="h-full w-full object-cover opacity-75 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div
                  class="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-stone-900 to-transparent"
                ></div>
              </template>
              <div v-else class="flex h-full w-full items-center justify-center">
                <Swords class="h-12 w-12 text-stone-800" />
              </div>

              <div class="absolute right-3 top-3 flex flex-col items-end gap-1.5">
                <span
                  :class="[
                    'rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm',
                    getWeightClass(weapon.weight).color,
                  ]"
                >
                  {{ getWeightClass(weapon.weight).label }}
                </span>
                <span
                  v-if="weapon.category"
                  class="rounded-sm border border-stone-700 bg-stone-900/80 px-2 py-0.5 text-xs text-stone-400 backdrop-blur-sm"
                >
                  {{ weapon.category }}
                </span>
              </div>
            </div>

            <div class="px-4 py-4">
              <h2
                class="mb-1 text-base font-semibold leading-tight text-stone-100 transition-colors group-hover:text-red-300"
              >
                {{ weapon.name }}
              </h2>
              <p class="mb-3 line-clamp-2 text-xs italic text-stone-500">
                {{ weapon.description || 'No lore recorded.' }}
              </p>

              <div class="mb-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                <span v-if="weapon.attack?.[0]" class="flex items-center gap-1.5 text-stone-600">
                  <Zap class="h-3 w-3 flex-shrink-0 text-orange-700" />
                  <span class="truncate"
                    >{{ weapon.attack[0].name }}
                    <span class="text-stone-400">{{ weapon.attack[0].amount }}</span></span
                  >
                </span>
                <span v-if="weapon.defence?.[0]" class="flex items-center gap-1.5 text-stone-600">
                  <Shield class="h-3 w-3 flex-shrink-0 text-sky-800" />
                  <span class="truncate"
                    >{{ weapon.defence[0].name }}
                    <span class="text-stone-400">{{ weapon.defence[0].amount }}</span></span
                  >
                </span>
                <span
                  v-if="weapon.requiredAttributes?.[0]"
                  class="flex items-center gap-1.5 text-stone-600"
                >
                  <span class="text-stone-700">Req</span>
                  <span class="truncate"
                    >{{ weapon.requiredAttributes[0].name }}
                    <span class="text-stone-400">{{
                      weapon.requiredAttributes[0].amount
                    }}</span></span
                  >
                </span>
                <span
                  v-if="weapon.scalesWith?.[0]"
                  class="flex items-center gap-1.5 text-stone-600"
                >
                  <span class="text-stone-700">Scale</span>
                  <span class="truncate"
                    >{{ weapon.scalesWith[0].name }}
                    <span
                      :class="getScalingColor(weapon.scalesWith[0].scaling)"
                      class="font-bold"
                      >{{ weapon.scalesWith[0].scaling }}</span
                    ></span
                  >
                </span>
              </div>

              <div class="my-3 h-px bg-stone-800"></div>

              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-xs text-stone-600">
                  <Weight class="h-3 w-3" />
                  {{ weapon.weight ?? '—' }}
                </span>
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
        <Swords class="h-4 w-4" />
        <div class="h-px flex-1 bg-stone-900"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Swords,
  Search,
  Shield,
  Zap,
  Weight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
} from 'lucide-vue-next'
import { getWeapons, type Weapon } from '@/api/Weapons'

const PAGE_SIZE = 9

const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
const PILL = 'rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer'
const PILL_ACTIVE = 'border-red-700 bg-red-950 text-red-400'
const PILL_IDLE =
  'border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300'
const weightOptions = ['All', 'Light', 'Medium', 'Heavy', 'Colossal']
const scalingOptions = ['All', 'S', 'A', 'B', 'C', 'D', 'E']

function getWeightClass(weight: number) {
  if (!weight || weight < 5)
    return { label: 'Light', color: 'bg-sky-950 text-sky-400 border-sky-800' }
  if (weight < 10)
    return { label: 'Medium', color: 'bg-emerald-950 text-emerald-400 border-emerald-800' }
  if (weight < 18) return { label: 'Heavy', color: 'bg-amber-950 text-amber-400 border-amber-800' }
  return { label: 'Colossal', color: 'bg-red-950 text-red-400 border-red-800' }
}
function getScalingColor(scaling: string) {
  const map: Record<string, string> = {
    S: 'text-yellow-400',
    A: 'text-orange-400',
    B: 'text-emerald-400',
    C: 'text-sky-400',
    D: 'text-stone-400',
  }
  return map[scaling] ?? 'text-stone-600'
}

const router = useRouter()
const weapons = ref<Weapon[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const query = ref('')
const category = ref('All')
const weightClass = ref('All')
const scalingFilter = ref('All')
const minAttack = ref('')
const page = ref(1)

onMounted(async () => {
  try {
    weapons.value = await getWeapons()
    if (weapons.value.length === 0) throw new Error('No weapons found')
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})

const categories = computed(() => [
  'All',
  ...Array.from(new Set(weapons.value.map((w) => w.category).filter(Boolean))).sort(),
])

function resetPage() {
  page.value = 1
}
function setFilter(type: string, val: string) {
  if (type === 'category') category.value = val
  else if (type === 'weight') weightClass.value = val
  else scalingFilter.value = val
  page.value = 1
}
function resetFilters() {
  query.value = ''
  category.value = 'All'
  weightClass.value = 'All'
  scalingFilter.value = 'All'
  minAttack.value = ''
  page.value = 1
}

const hasActiveFilters = computed(
  () =>
    query.value !== '' ||
    category.value !== 'All' ||
    weightClass.value !== 'All' ||
    scalingFilter.value !== 'All' ||
    minAttack.value !== '',
)

const filtered = computed(() => {
  const minAtk = minAttack.value !== '' ? Number(minAttack.value) : null
  return weapons.value.filter((w) => {
    const wc = getWeightClass(w.weight)
    if (
      query.value &&
      !w.name.toLowerCase().includes(query.value.toLowerCase()) &&
      !w.category?.toLowerCase().includes(query.value.toLowerCase()) &&
      !w.description?.toLowerCase().includes(query.value.toLowerCase())
    )
      return false
    if (category.value !== 'All' && w.category !== category.value) return false
    if (weightClass.value !== 'All' && wc.label !== weightClass.value) return false
    if (
      scalingFilter.value !== 'All' &&
      !w.scalesWith?.some((s) => s.scaling === scalingFilter.value)
    )
      return false
    if (minAtk !== null && (w.attack?.[0]?.amount ?? 0) < minAtk) return false
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
