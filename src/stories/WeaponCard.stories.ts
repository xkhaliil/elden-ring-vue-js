import type { Meta, StoryObj } from '@storybook/vue3'
import WeaponCard from '../components/weapons/WeaponCard.vue'

const meta = {
  title: 'Components/WeaponCard',
  component: WeaponCard,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="max-w-sm p-4 bg-stone-950"><story /></div>',
    }),
  ],
} satisfies Meta<typeof WeaponCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    weapon: {
      id: '1',
      name: 'Uchigatana',
      image: 'https://eldenring.fanapis.com/images/weapons/17f69c34b67l0i1z28kwwq0l2l40l.png',
      description:
        'A katana with a long single-edged curved blade. A unique weapon wielded by the samurai from the Land of Reeds.',
      category: 'Katana',
      weight: 5.5,
      attack: [{ name: 'Phy', amount: 115 }],
      defence: [{ name: 'Phy', amount: 45 }],
      requiredAttributes: [{ name: 'Str', amount: 11 }],
      scalesWith: [{ name: 'Str', scaling: 'D' }],
    },
  },
}

export const ColossalWeapon: Story = {
  args: {
    weapon: {
      id: '2',
      name: 'Greatsword',
      image: 'https://eldenring.fanapis.com/images/weapons/17f69c34b67l0i1z28kwwq0l2l40l.png',
      description:
        'A coarse iron lump of an ultra greatsword. Mows down foes by utilizing its incredible weight.',
      category: 'Colossal Sword',
      weight: 23,
      attack: [{ name: 'Phy', amount: 164 }],
      defence: [{ name: 'Phy', amount: 67 }],
      requiredAttributes: [{ name: 'Str', amount: 31 }],
      scalesWith: [{ name: 'Str', scaling: 'C' }],
    },
  },
}

export const ExcellentScaling: Story = {
  args: {
    weapon: {
      id: '3',
      name: 'Moonveil',
      image: '',
      description: 'Katana forged of glintstone. Masterpiece of a Sellian swordsmith.',
      category: 'Katana',
      weight: 6.5,
      attack: [{ name: 'Mag', amount: 87 }],
      defence: [{ name: 'Mag', amount: 57 }],
      requiredAttributes: [{ name: 'Int', amount: 23 }],
      scalesWith: [{ name: 'Int', scaling: 'S' }],
    },
  },
}
