import type { Meta, StoryObj } from '@storybook/vue3'
import WeaponFilter from '../components/weapons/WeaponFilter.vue'
import { ref } from 'vue'

const meta = {
  title: 'Components/WeaponFilter',
  component: WeaponFilter,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="max-w-md p-6 bg-[#0a0804] text-stone-200"><story /></div>',
    }),
  ],
} satisfies Meta<typeof WeaponFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    query: '',
    weightFilter: 'All',
    scalingFilter: 'All',
  },
  render: (args) => ({
    components: { WeaponFilter },
    setup() {
      const query = ref(args.query)
      const weightFilter = ref(args.weightFilter)
      const scalingFilter = ref(args.scalingFilter)

      const onReset = () => {
        query.value = ''
        weightFilter.value = 'All'
        scalingFilter.value = 'All'
      }

      return {
        query,
        weightFilter,
        scalingFilter,
        onReset,
      }
    },
    template: `
      <WeaponFilter 
        v-model:query="query"
        v-model:weightFilter="weightFilter"
        v-model:scalingFilter="scalingFilter"
        @reset="onReset"
      />
    `,
  }),
}

export const ActiveFilters: Story = {
  args: {
    query: 'Greatsword',
    weightFilter: 'Colossal',
    scalingFilter: 'A',
  },
  render: (args) => ({
    components: { WeaponFilter },
    setup() {
      const query = ref(args.query)
      const weightFilter = ref(args.weightFilter)
      const scalingFilter = ref(args.scalingFilter)

      const onReset = () => {
        query.value = ''
        weightFilter.value = 'All'
        scalingFilter.value = 'All'
      }

      return {
        query,
        weightFilter,
        scalingFilter,
        onReset,
      }
    },
    template: `
      <WeaponFilter 
        v-model:query="query"
        v-model:weightFilter="weightFilter"
        v-model:scalingFilter="scalingFilter"
        @reset="onReset"
      />
    `,
  }),
}
