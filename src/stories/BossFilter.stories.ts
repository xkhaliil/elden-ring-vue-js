import type { Meta, StoryObj } from '@storybook/vue3'
import BossFilter from '../components/bosses/BossFilter.vue'
import { ref } from 'vue'

const meta = {
  title: 'Components/BossFilter',
  component: BossFilter,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="max-w-md p-6 bg-[#0a0804] text-stone-200"><story /></div>',
    }),
  ],
} satisfies Meta<typeof BossFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    query: '',
    difficulty: 'All',
    dropsFilter: 'All',
    minHp: '',
    maxHp: '',
  },
  render: (args) => ({
    components: { BossFilter },
    setup() {
      const query = ref(args.query)
      const difficulty = ref(args.difficulty)
      const dropsFilter = ref(args.dropsFilter)
      const minHp = ref(args.minHp)
      const maxHp = ref(args.maxHp)

      const onReset = () => {
        query.value = ''
        difficulty.value = 'All'
        dropsFilter.value = 'All'
        minHp.value = ''
        maxHp.value = ''
      }

      return {
        query,
        difficulty,
        dropsFilter,
        minHp,
        maxHp,
        onReset,
      }
    },
    template: `
      <BossFilter 
        v-model:query="query"
        v-model:difficulty="difficulty"
        v-model:dropsFilter="dropsFilter"
        v-model:minHp="minHp"
        v-model:maxHp="maxHp"
        @reset="onReset"
      />
    `,
  }),
}

export const ActiveFilters: Story = {
  args: {
    query: 'Margit',
    difficulty: 'Hard',
    dropsFilter: 'Has Drops',
    minHp: '1000',
    maxHp: '5000',
  },
  render: (args) => ({
    components: { BossFilter },
    setup() {
      const query = ref(args.query)
      const difficulty = ref(args.difficulty)
      const dropsFilter = ref(args.dropsFilter)
      const minHp = ref(args.minHp)
      const maxHp = ref(args.maxHp)

      const onReset = () => {
        query.value = ''
        difficulty.value = 'All'
        dropsFilter.value = 'All'
        minHp.value = ''
        maxHp.value = ''
      }

      return {
        query,
        difficulty,
        dropsFilter,
        minHp,
        maxHp,
        onReset,
      }
    },
    template: `
      <BossFilter 
        v-model:query="query"
        v-model:difficulty="difficulty"
        v-model:dropsFilter="dropsFilter"
        v-model:minHp="minHp"
        v-model:maxHp="maxHp"
        @reset="onReset"
      />
    `,
  }),
}
