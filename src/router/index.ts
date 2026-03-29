// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/components/pages/HomePage.vue') },
  { path: '/bosses', component: () => import('@/components/pages/BossesPage.vue') },
  { path: '/bosses/:id', component: () => import('@/components/pages/BossDetail.vue') },
  { path: '/weapons', component: () => import('@/components/pages/WeaponsPage.vue') },
  { path: '/weapons/:id', component: () => import('@/components/pages/WeaponsDetail.vue') },
  { path: '/items', component: () => import('@/components/pages/ItemsPage.vue') },
  { path: '/items/:id', component: () => import('@/components/pages/ItemDetail.vue') },
]

export default createRouter({ history: createWebHistory(), routes })
