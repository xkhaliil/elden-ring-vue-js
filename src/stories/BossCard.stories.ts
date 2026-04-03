import type { Meta, StoryObj } from '@storybook/vue3'
import BossCard from '../components/bosses/BossCard.vue'

const meta = {
  title: 'Components/BossCard',
  component: BossCard,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="max-w-sm p-4 bg-stone-950"><story /></div>',
    }),
  ],
} satisfies Meta<typeof BossCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    boss: {
      id: '1',
      name: 'Margit, the Fell Omen',
      image: 'https://eldenring.fanapis.com/images/bosses/17f69c34b67l0i1z28kwwq0l2l40l.png',
      description:
        'Margit the Fell Omen is a Boss in Elden Ring. Margit the Fell Omen is a very powerful boss and an early roadblock for many players.',
      location: 'Stormhill',
      drops: ['Talisman Pouch', '12000 Runes'],
      healthPoints: 4174,
    },
  },
}

export const NoImage: Story = {
  args: {
    boss: {
      id: '2',
      name: 'Unknown Boss',
      image: '',
      description: 'A boss hidden in the shadows.',
      location: 'Unknown',
      drops: [],
      healthPoints: 1000,
    },
  },
}

export const HighHP: Story = {
  args: {
    boss: {
      id: '3',
      name: 'Malenia, Blade of Miquella',
      image: 'https://eldenring.fanapis.com/images/bosses/17f699ab9c5l0i1z1w1z0o1g1p3z0a.png',
      description: 'Malenia is a demigod boss and one of the hardest encounters in the game.',
      location: 'Elphael, Brace of the Haligtree',
      drops: ['Remembrance of the Rot Goddess', "Malenia's Great Rune", '480000 Runes'],
      healthPoints: 33251,
    },
  },
}
