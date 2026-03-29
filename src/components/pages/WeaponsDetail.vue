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

    <div v-if="loading" class="flex min-h-screen flex-col items-center justify-center gap-4">
      <Loader2 class="h-8 w-8 animate-spin text-red-700" />
      <p class="italic text-stone-600">Forging the details…</p>
    </div>

    <div v-else-if="error" class="flex min-h-screen flex-col items-center justify-center gap-3">
      <Swords class="h-10 w-10 text-red-800" />
      <p class="italic text-red-700">This weapon is lost to the ages.</p>
      <p class="text-sm text-stone-600">{{ error }}</p>
      <button
        @click="router.back()"
        class="mt-4 flex items-center gap-2 rounded-sm border border-stone-800 px-4 py-2 text-sm text-stone-500 transition-colors hover:border-stone-600 hover:text-stone-300"
      >
        <ArrowLeft class="h-4 w-4" /> Go back
      </button>
    </div>

    <div v-else-if="weapon" class="mx-auto max-w-4xl px-6 py-12">
      <button
        @click="router.back()"
        class="mb-10 flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-red-500"
      >
        <ArrowLeft class="h-4 w-4" /> Back to Weapons
      </button>

      <div class="relative mb-12 overflow-hidden rounded-sm border border-stone-800/60">
        <div v-if="weapon.image" class="relative h-80 w-full sm:h-96">
          <img :src="weapon.image" :alt="weapon.name" class="h-full w-full object-cover" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#0a0804] via-[#0a0804]/40 to-transparent"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#0a0804]/60 via-transparent to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 p-8">
            <div class="mb-3 flex items-center gap-3 text-red-600">
              <div class="h-px w-8 bg-red-600"></div>
              <Swords class="h-4 w-4" />
            </div>
            <h1
              class="text-4xl font-bold text-stone-100 sm:text-5xl"
              style="text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8)"
            >
              {{ weapon.name }}
            </h1>
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <span
                v-if="weapon.category"
                class="rounded-sm border border-stone-700 bg-stone-900/70 px-2 py-0.5 text-xs text-stone-400 backdrop-blur-sm"
                >{{ weapon.category }}</span
              >
              <span :class="['rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm', wc.color]">{{
                wc.label
              }}</span>
            </div>
          </div>
        </div>
        <div v-else class="flex h-64 w-full items-center justify-center bg-stone-950">
          <Swords class="h-16 w-16 text-stone-800" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2">
          <div class="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
            <div class="mb-4 flex items-center gap-3">
              <div class="h-px w-6 bg-red-800"></div>
              <h2 class="text-xs uppercase tracking-widest text-stone-500">Description</h2>
            </div>
            <p class="text-lg italic leading-relaxed text-stone-300">
              {{ weapon.description || 'No description recorded.' }}
            </p>
          </div>

          <div
            v-if="weapon.attack?.length"
            class="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6"
          >
            <div class="mb-5 flex items-center gap-3">
              <div class="h-px w-6 bg-red-800"></div>
              <h2 class="text-xs uppercase tracking-widest text-stone-500">Attack Power</h2>
            </div>
            <div class="space-y-4">
              <div v-for="(atk, i) in weapon.attack" :key="i">
                <div class="mb-1.5 flex items-center justify-between text-xs">
                  <span class="text-stone-500">{{ atk.name }}</span>
                  <span class="font-semibold text-stone-300">{{ atk.amount }}</span>
                </div>
                <div class="h-1.5 w-full overflow-hidden rounded-full bg-stone-800">
                  <div
                    class="h-full rounded-full bg-orange-700 transition-all duration-700"
                    :style="{ width: `${Math.min(100, (atk.amount / 200) * 100)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="weapon.defence?.length"
            class="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6"
          >
            <div class="mb-5 flex items-center gap-3">
              <div class="h-px w-6 bg-red-800"></div>
              <h2 class="text-xs uppercase tracking-widest text-stone-500">Damage Negation</h2>
            </div>
            <div class="space-y-4">
              <div v-for="(def, i) in weapon.defence" :key="i">
                <div class="mb-1.5 flex items-center justify-between text-xs">
                  <span class="text-stone-500">{{ def.name }}</span>
                  <span class="font-semibold text-stone-300">{{ def.amount }}</span>
                </div>
                <div class="h-1.5 w-full overflow-hidden rounded-full bg-stone-800">
                  <div
                    class="h-full rounded-full bg-sky-700 transition-all duration-700"
                    :style="{ width: `${Math.min(100, def.amount)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
            <div class="mb-4 flex items-center gap-3">
              <div class="h-px w-6 bg-red-800"></div>
              <h2 class="text-xs uppercase tracking-widest text-stone-500">Details</h2>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-sm text-stone-500"
                  ><Weight class="h-3.5 w-3.5" /> Weight</span
                >
                <span class="text-sm text-stone-300">{{ weapon.weight ?? '—' }}</span>
              </div>
              <div class="h-px bg-stone-800"></div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-sm text-stone-500"
                  ><Swords class="h-3.5 w-3.5" /> Category</span
                >
                <span class="text-sm text-stone-300">{{ weapon.category || '—' }}</span>
              </div>
              <div class="h-px bg-stone-800"></div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-sm text-stone-500"
                  ><Shield class="h-3.5 w-3.5" /> Weight Class</span
                >
                <span
                  :class="[
                    'text-sm font-semibold',
                    wc.color.split(' ').find((c) => c.startsWith('text-')),
                  ]"
                  >{{ wc.label }}</span
                >
              </div>
              <div class="h-px bg-stone-800"></div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-sm text-stone-500"
                  ><Zap class="h-3.5 w-3.5" /> Base Attack</span
                >
                <span class="text-sm text-stone-300">{{ weapon.attack?.[0]?.amount ?? '—' }}</span>
              </div>
            </div>
          </div>

          <div
            v-if="weapon.requiredAttributes?.length"
            class="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6"
          >
            <div class="mb-4 flex items-center gap-3">
              <div class="h-px w-6 bg-red-800"></div>
              <h2 class="text-xs uppercase tracking-widest text-stone-500">Requirements</h2>
            </div>
            <div class="space-y-3">
              <div
                v-for="(req, i) in weapon.requiredAttributes"
                :key="i"
                class="flex items-center justify-between"
              >
                <span class="text-sm text-stone-500">{{ req.name }}</span>
                <span
                  class="rounded-sm border border-stone-700 bg-stone-900 px-2 py-0.5 text-xs text-stone-300"
                  >{{ req.amount }}</span
                >
              </div>
            </div>
          </div>

          <div
            v-if="weapon.scalesWith?.length"
            class="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6"
          >
            <div class="mb-4 flex items-center gap-3">
              <div class="h-px w-6 bg-red-800"></div>
              <h2 class="text-xs uppercase tracking-widest text-stone-500">Scaling</h2>
            </div>
            <div class="space-y-3">
              <div
                v-for="(scale, i) in weapon.scalesWith"
                :key="i"
                class="flex items-center justify-between"
              >
                <span class="flex items-center gap-1.5 text-sm text-stone-500"
                  ><Star class="h-3 w-3" /> {{ scale.name }}</span
                >
                <span :class="['text-lg font-bold', getScalingColor(scale.scaling)]">{{
                  scale.scaling
                }}</span>
              </div>
            </div>
          </div>

          <div class="rounded-sm border border-red-900/30 bg-red-950/10 p-4">
            <p class="text-center text-xs italic text-red-900/60">
              Every blade tells a story of ruin.
            </p>
          </div>
        </div>
      </div>

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
import { useRouter, useRoute } from 'vue-router'
import { Swords, Shield, Zap, Weight, Star, ArrowLeft, Loader2 } from 'lucide-vue-next'
import { getWeapon, type Weapon } from '@/api/Weapons'

const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

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
const route = useRoute()
const weapon = ref<Weapon | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const id = route.params.id as string
    const found = await getWeapon(id)
    if (!found) throw new Error('Weapon not found')
    weapon.value = found
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})

const wc = computed(() => getWeightClass(weapon.value?.weight ?? 0))
</script>
