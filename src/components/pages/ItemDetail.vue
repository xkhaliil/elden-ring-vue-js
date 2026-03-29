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
      <p class="italic text-stone-600">Unearthing the relic…</p>
    </div>

    <div v-else-if="error" class="flex min-h-screen flex-col items-center justify-center gap-3">
      <Skull class="h-10 w-10 text-red-800" />
      <p class="italic text-red-700">This relic has been lost.</p>
      <p class="text-sm text-stone-600">{{ error }}</p>
      <button
        @click="router.back()"
        class="mt-4 flex items-center gap-2 rounded-sm border border-stone-800 px-4 py-2 text-sm text-stone-500 transition-colors hover:border-stone-600 hover:text-stone-300"
      >
        <ArrowLeft class="h-4 w-4" /> Go back
      </button>
    </div>

    <div v-else-if="item" class="mx-auto max-w-4xl px-6 py-12">
      <button
        @click="router.back()"
        class="mb-10 flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-red-500"
      >
        <ArrowLeft class="h-4 w-4" /> Back to Items
      </button>

      <div class="relative mb-12 overflow-hidden rounded-sm border border-stone-800/60">
        <div v-if="item.image" class="relative h-80 w-full sm:h-96">
          <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#0a0804] via-[#0a0804]/40 to-transparent"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#0a0804]/60 via-transparent to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 p-8">
            <div class="mb-3 flex items-center gap-3 text-red-600">
              <div class="h-px w-8 bg-red-600"></div>
              <FlaskConical class="h-4 w-4" />
            </div>
            <h1
              class="text-4xl font-bold text-stone-100 sm:text-5xl"
              style="text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8)"
            >
              {{ item.name }}
            </h1>
            <div v-if="item.type" class="mt-3">
              <span
                :class="[
                  'rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm',
                  getTypeColor(item.type),
                ]"
                >{{ item.type }}</span
              >
            </div>
          </div>
        </div>
        <div v-else class="flex h-64 w-full items-center justify-center bg-stone-950">
          <FlaskConical class="h-16 w-16 text-stone-800" />
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
              {{ item.description || 'No lore has been recorded for this relic.' }}
            </p>
          </div>

          <div v-if="item.effect" class="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
            <div class="mb-4 flex items-center gap-3">
              <div class="h-px w-6 bg-red-800"></div>
              <h2 class="text-xs uppercase tracking-widest text-stone-500">Effect</h2>
            </div>
            <div
              class="flex items-start gap-3 rounded-sm border border-yellow-900/30 bg-yellow-950/10 p-4"
            >
              <Sparkles class="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-700" />
              <p class="leading-relaxed text-stone-300">{{ item.effect }}</p>
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
                  ><Tag class="h-3.5 w-3.5" /> Type</span
                >
                <span :class="['rounded-sm border px-2 py-0.5 text-xs', getTypeColor(item.type)]">{{
                  item.type || 'Unknown'
                }}</span>
              </div>
              <div class="h-px bg-stone-800"></div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-sm text-stone-500"
                  ><Sparkles class="h-3.5 w-3.5" /> Has Effect</span
                >
                <span
                  :class="[
                    'text-sm font-semibold',
                    item.effect ? 'text-emerald-400' : 'text-stone-600',
                  ]"
                  >{{ item.effect ? 'Yes' : 'No' }}</span
                >
              </div>
              <div class="h-px bg-stone-800"></div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-sm text-stone-500"
                  ><FlaskConical class="h-3.5 w-3.5" /> Rarity</span
                >
                <span class="text-sm text-stone-300">{{
                  item.type?.toLowerCase().includes('key') ? 'Unique' : 'Common'
                }}</span>
              </div>
            </div>
          </div>

          <div class="rounded-sm border border-red-900/30 bg-red-950/10 p-4">
            <p class="text-center text-xs italic text-red-900/60">
              Every relic holds a fragment of a forgotten age.
            </p>
          </div>
        </div>
      </div>

      <div class="mt-16 flex items-center justify-center gap-3 text-stone-800">
        <div class="h-px flex-1 bg-stone-900"></div>
        <FlaskConical class="h-4 w-4" />
        <div class="h-px flex-1 bg-stone-900"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FlaskConical, Skull, Sparkles, Tag, ArrowLeft, Loader2 } from 'lucide-vue-next'
import { getItem, type Item } from '@/api/Items'

const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

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
const route = useRoute()
const item = ref<Item | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const id = route.params.id as string
    const found = await getItem(id)
    if (!found) throw new Error('Item not found')
    item.value = found
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})
</script>
