<template>
  <div
    class="group cursor-pointer overflow-hidden rounded-sm border border-stone-800/60 bg-stone-900/30 transition-all duration-300 hover:border-red-900 hover:bg-stone-900/60"
    @click="$emit('click')"
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
          :class="['rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm', weightClass.color]"
        >
          {{ weightClass.label }}
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
        <span v-if="primaryAttack" class="flex items-center gap-1.5 text-stone-600">
          <Zap class="h-3 w-3 flex-shrink-0 text-orange-700" />
          <span class="truncate">
            {{ primaryAttack.name }}
            <span class="text-stone-400">{{ primaryAttack.amount }}</span>
          </span>
        </span>

        <span v-if="primaryDefence" class="flex items-center gap-1.5 text-stone-600">
          <Shield class="h-3 w-3 flex-shrink-0 text-sky-800" />
          <span class="truncate">
            {{ primaryDefence.name }}
            <span class="text-stone-400">{{ primaryDefence.amount }}</span>
          </span>
        </span>

        <span v-if="primaryReq" class="flex items-center gap-1.5 text-stone-600">
          <span class="text-stone-700">Req</span>
          <span class="truncate">
            {{ primaryReq.name }}
            <span class="text-stone-400">{{ primaryReq.amount }}</span>
          </span>
        </span>

        <span v-if="primaryScaling" class="flex items-center gap-1.5 text-stone-600">
          <span class="text-stone-700">Scale</span>
          <span class="truncate">
            {{ primaryScaling.name }}
            <span :class="['font-bold', getScalingColor(primaryScaling.scaling)]">
              {{ primaryScaling.scaling }}
            </span>
          </span>
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Swords, Shield, Zap, Weight, ChevronRight } from 'lucide-vue-next'
import type { Weapon } from '@/api/Weapons'

const props = defineProps<{
  weapon: Weapon
}>()

defineEmits<{
  (e: 'click'): void
}>()

const weightClass = computed(() => {
  const w = props.weapon.weight
  if (!w || w === 0) return { label: 'Light', color: 'bg-sky-950 text-sky-400 border-sky-800' }
  if (w < 5) return { label: 'Light', color: 'bg-sky-950 text-sky-400 border-sky-800' }
  if (w < 10)
    return { label: 'Medium', color: 'bg-emerald-950 text-emerald-400 border-emerald-800' }
  if (w < 18) return { label: 'Heavy', color: 'bg-amber-950 text-amber-400 border-amber-800' }
  return { label: 'Colossal', color: 'bg-red-950 text-red-400 border-red-800' }
})

const primaryAttack = computed(() => props.weapon.attack?.[0])
const primaryDefence = computed(() => props.weapon.defence?.[0])
const primaryReq = computed(() => props.weapon.requiredAttributes?.[0])
const primaryScaling = computed(() => props.weapon.scalesWith?.[0])

function getScalingColor(scaling: string): string {
  switch (scaling) {
    case 'S':
      return 'text-yellow-400'
    case 'A':
      return 'text-orange-400'
    case 'B':
      return 'text-emerald-400'
    case 'C':
      return 'text-sky-400'
    case 'D':
      return 'text-stone-400'
    default:
      return 'text-stone-600'
  }
}
</script>
