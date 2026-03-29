<template>
  <header>
    <div class="absolute top-0 left-0 z-10 w-full">
      <div
        style="
          display: flex;
          height: 6rem;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          padding-left: 1rem;
          padding-right: 1rem;
        "
      >
        <div>
          <RouterLink to="/">
            <img :src="logo" alt="Logo" width="60" height="60" />
          </RouterLink>
        </div>

        <div style="margin-right: 1rem; display: flex; gap: 1rem">
          <RouterLink to="/bosses" @click="props.onclicktoBosses" style="text-decoration: none">
            <div style="color: white">Bosses</div>
          </RouterLink>

          <RouterLink to="/weapons" @click="props.onclicktoWeapons" style="text-decoration: none">
            <div style="color: white">Weapons</div>
          </RouterLink>

          <RouterLink to="/items" @click="props.onclicktoItems" style="text-decoration: none">
            <div style="color: white">Items</div>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import './header.css'
import { RouterLink } from 'vue-router'
import navbarLogo from '@/assets/navbar-logo.png'

type User = {
  name: string
}

interface Props {
  user?: User
  onclicktoBosses?: () => void
  onclicktoWeapons?: () => void
  onclicktoItems?: () => void
}

defineOptions({
  name: 'StoryHeader',
})

const props = defineProps<Props>()

const logo = navbarLogo
</script>
