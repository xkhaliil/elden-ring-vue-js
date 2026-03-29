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
      <p class="italic text-stone-600">Summoning the fallen…</p>
    </div>

    <div v-else-if="error" class="flex min-h-screen flex-col items-center justify-center gap-3">
      <Skull class="h-10 w-10 text-red-800" />
      <p class="italic text-red-700">The fog gate remains sealed.</p>
      <p class="text-sm text-stone-600">{{ error }}</p>
      <button
        @click="router.back()"
        class="mt-4 flex items-center gap-2 rounded-sm border border-stone-800 px-4 py-2 text-sm text-stone-500 transition-colors hover:border-stone-600 hover:text-stone-300"
      >
        <ArrowLeft class="h-4 w-4" />
        Go back
      </button>
    </div>

    <div v-else-if="boss" class="mx-auto max-w-4xl px-6 py-12">
      <button
        @click="router.back()"
        class="mb-10 flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-red-500"
      >
        <ArrowLeft class="h-4 w-4" />
        Back to Bosses
      </button>

      <div class="relative mb-12 overflow-hidden rounded-sm border border-stone-800/60">
        <div v-if="boss.image" class="relative h-80 w-full sm:h-96">
          <img :src="boss.image" :alt="boss.name" class="h-full w-full object-cover" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#0a0804] via-[#0a0804]/40 to-transparent"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#0a0804]/60 via-transparent to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 p-8">
            <div class="mb-3 flex items-center gap-3 text-red-600">
              <div class="h-px w-8 bg-red-600"></div>
              <Skull class="h-4 w-4" />
            </div>
            <h1
              class="text-4xl font-bold text-stone-100 sm:text-5xl"
              style="text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8)"
            >
              {{ boss.name }}
            </h1>
            <p v-if="boss.location" class="mt-2 flex items-center gap-1.5 text-stone-400">
              <MapPin class="h-3.5 w-3.5" />
              {{ boss.location }}
            </p>
          </div>
        </div>
        <div v-else class="flex h-64 w-full items-center justify-center bg-stone-950">
          <Skull class="h-16 w-16 text-stone-800" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2">
          <div class="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
            <div class="mb-4 flex items-center gap-3">
              <div class="h-px w-6 bg-red-800"></div>
              <h2 class="text-xs uppercase tracking-widest text-stone-500">Lore</h2>
            </div>
            <p class="text-lg italic leading-relaxed text-stone-300">
              {{ boss.description || 'No lore has been recorded for this entity.' }}
            </p>
          </div>

          <div
            v-if="boss.drops && boss.drops.length > 0"
            class="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6"
          >
            <div class="mb-4 flex items-center gap-3">
              <div class="h-px w-6 bg-red-800"></div>
              <h2 class="text-xs uppercase tracking-widest text-stone-500">Drops</h2>
            </div>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div
                v-for="(drop, idx) in boss.drops"
                :key="idx"
                class="flex items-center gap-3 rounded-sm border border-stone-800 bg-stone-900/40 px-3 py-2.5"
              >
                <Flame class="h-3.5 w-3.5 flex-shrink-0 text-orange-700" />
                <span class="text-sm text-stone-300">{{ drop }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
            <div class="mb-4 flex items-center gap-3">
              <div class="h-px w-6 bg-red-800"></div>
              <h2 class="text-xs uppercase tracking-widest text-stone-500">Stats</h2>
            </div>
            <div class="space-y-5">
              <div>
                <div class="mb-2 flex items-center justify-between text-sm">
                  <span class="flex items-center gap-1.5 text-stone-500">
                    <Heart class="h-3.5 w-3.5 text-red-800" />
                    Health Points
                  </span>
                  <span class="font-semibold text-stone-300">
                    {{ boss.healthPoints > 0 ? boss.healthPoints.toLocaleString() : '—' }}
                  </span>
                </div>
                <div class="h-1.5 w-full overflow-hidden rounded-full bg-stone-800">
                  <div
                    :class="['h-full rounded-full transition-all duration-700', diff.bar]"
                    :style="{ width: `${diff.percent}%` }"
                  ></div>
                </div>
              </div>

              <div class="h-px bg-stone-800"></div>

              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-sm text-stone-500">
                  <Skull class="h-3.5 w-3.5" />
                  Difficulty
                </span>
                <span :class="['flex items-center gap-1.5 text-sm font-semibold', diff.color]">
                  <span :class="['h-2 w-2 rounded-full', diff.dot]"></span>
                  {{ diff.label }}
                </span>
              </div>

              <div class="h-px bg-stone-800"></div>

              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-sm text-stone-500">
                  <MapPin class="h-3.5 w-3.5" />
                  Location
                </span>
                <span class="max-w-[55%] text-right text-sm text-stone-300">{{
                  boss.location || 'Unknown'
                }}</span>
              </div>

              <div class="h-px bg-stone-800"></div>

              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-sm text-stone-500">
                  <Package class="h-3.5 w-3.5" />
                  Drops
                </span>
                <span class="text-sm text-stone-300">
                  {{
                    boss.drops?.length > 0
                      ? `${boss.drops.length} item${boss.drops.length > 1 ? 's' : ''}`
                      : 'None'
                  }}
                </span>
              </div>

              <div class="h-px bg-stone-800"></div>

              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-sm text-stone-500">
                  <Shield class="h-3.5 w-3.5" />
                  Type
                </span>
                <span class="text-sm text-stone-300">Field Boss</span>
              </div>
            </div>
          </div>

          <div class="rounded-sm border border-red-900/30 bg-red-950/10 p-4">
            <p class="text-center text-xs italic text-red-900/60">
              Tread carefully, Tarnished. Death is not the end.
            </p>
          </div>
        </div>
      </div>

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
import { useRouter, useRoute } from 'vue-router'
import { Skull, Flame, Shield, ArrowLeft, Loader2, MapPin, Heart, Package } from 'lucide-vue-next'
import { getBoss, type Boss } from '@/api/bosses'

const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const router = useRouter()
const route = useRoute()
const boss = ref<Boss | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const id = route.params.id as string
    const found = await getBoss(id)
    if (!found) throw new Error('Boss not found')
    boss.value = found
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})

function getDifficulty(hp: number) {
  if (!hp || hp === 0)
    return {
      label: 'Unknown',
      color: 'text-stone-400',
      bar: 'bg-stone-600',
      dot: 'bg-stone-400',
      percent: 0,
    }
  if (hp < 3000)
    return {
      label: 'Medium',
      color: 'text-emerald-400',
      bar: 'bg-emerald-600',
      dot: 'bg-emerald-400',
      percent: 25,
    }
  if (hp < 7000)
    return {
      label: 'Hard',
      color: 'text-amber-400',
      bar: 'bg-amber-600',
      dot: 'bg-amber-400',
      percent: 50,
    }
  if (hp < 12000)
    return {
      label: 'Very Hard',
      color: 'text-orange-400',
      bar: 'bg-orange-600',
      dot: 'bg-orange-400',
      percent: 75,
    }
  return {
    label: 'Extreme',
    color: 'text-red-400',
    bar: 'bg-red-600',
    dot: 'bg-red-500',
    percent: 100,
  }
}

const diff = computed(() => getDifficulty(boss.value?.healthPoints ?? 0))
</script>
