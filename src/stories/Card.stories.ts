import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Card from './Card.vue'
import bossesImg from '@/assets/bosses.jpg'
import weaponsImg from '@/assets/weapons.jpg'
import itemsImg from '@/assets/items.jpg'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
        <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 2rem;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    buttonLabel: { control: 'text' },
    imageSrc: { control: 'text' },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Bosses: Story = {
  args: {
    title: 'Bosses',
    description: 'Explore the bosses of Elden Ring',
    buttonLabel: 'Search Bosses',
    imageSrc: bossesImg,
  },
}

export const Weapons: Story = {
  args: {
    title: 'Weapons',
    description: 'Explore the weapons of Elden Ring',
    buttonLabel: 'Search Weapons',
    imageSrc: weaponsImg,
  },
}

export const Items: Story = {
  args: {
    title: 'Items',
    description: 'Explore the items of Elden Ring',
    buttonLabel: 'Search Items',
    imageSrc: itemsImg,
  },
}
