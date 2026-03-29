<template>
  <div class="card">
    <div class="card__overlay" />
    <img :src="imageSrc" :alt="title" class="card__image" />

    <div class="card__header">
      <h3 class="card__title">{{ title }}</h3>
      <p class="card__description">{{ description }}</p>
    </div>

    <div class="card__footer">
      <button
        class="card__button storybook-button storybook-button--primary storybook-button--medium"
        @click="handleClick"
      >
        {{ buttonLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import './card.css'

defineOptions({
  name: 'StoryCard',
})

interface Props {
  title: string
  description: string
  buttonLabel: string
  imageSrc: string
  onClick?: () => void
}

const props = defineProps<Props>()

const handleClick = () => {
  props.onClick?.()
}
</script>
