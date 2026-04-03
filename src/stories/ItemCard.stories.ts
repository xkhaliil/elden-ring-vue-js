import type { Meta, StoryObj } from '@storybook/vue3'
import ItemCard from '../components/items/ItemCard.vue'

const meta = {
  title: 'Components/ItemCard',
  component: ItemCard,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="max-w-sm p-4 bg-stone-950"><story /></div>',
    }),
  ],
} satisfies Meta<typeof ItemCard>

export default meta
type Story = StoryObj<typeof meta>

export const Consumable: Story = {
  args: {
    item: {
      id: '1',
      name: 'Flask of Crimson Tears',
      image: 'https://eldenring.fanapis.com/images/items/17f69c34b67l0i1z28kwwq0l2l40l.png',
      description:
        'A sacred flask modeled after a golden holy chalice that was once graced by a tear of life.',
      type: 'Consumable',
      effect: 'Restores HP',
    },
  },
}

export const KeyItem: Story = {
  args: {
    item: {
      id: '2',
      name: 'Dectus Medallion (Left)',
      image: 'https://eldenring.fanapis.com/images/items/17f699ab9c5l0i1z1w1z0o1g1p3z0a.png',
      description:
        'Left half of a split medallion depicting the Erdtree. Brandishing the medallion with both halves conjoined will activate the Grand Lift of Dectus.',
      type: 'Key Item',
      effect: 'Operates the Grand Lift of Dectus',
    },
  },
}

export const Material: Story = {
  args: {
    item: {
      id: '3',
      name: 'Smithing Stone [1]',
      image: '',
      description: 'Stone used to smith weapons. Found in early areas.',
      type: 'Upgrade Material',
      effect: 'Upgrades armaments up to +3',
    },
  },
}
