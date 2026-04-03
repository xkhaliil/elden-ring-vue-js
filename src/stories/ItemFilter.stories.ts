import type { Meta, StoryObj } from '@storybook/vue3'
import ItemFilter from '../components/items/ItemFilter.vue'
import { ref } from 'vue'

const meta = {
  title: 'Components/ItemFilter',
  component: ItemFilter,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="max-w-md p-6 bg-[#0a0804] text-stone-200"><story /></div>',
    }),
  ],
} satisfies Meta<typeof ItemFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    query: '',
    typeFilter: 'All',
  },
  render: (args) => ({
    components: { ItemFilter },
    setup() {
      const query = ref(args.query)
      const typeFilter = ref(args.typeFilter)

      const onReset = () => {
        query.value = ''
        typeFilter.value = 'All'
      }

      return {
        query,
        typeFilter,
        onReset,
      }
    },
    template: `
      <ItemFilter 
        v-model:query="query"
        v-model:typeFilter="typeFilter"
        @reset="onReset"
      />
    `,
  }),
}

export const ActiveFilters: Story = {
  args: {
    query: 'Tear',
    typeFilter: 'Consumable',
  },
  render: (args) => ({
    components: { ItemFilter },
    setup() {
      const query = ref(args.query)
      const typeFilter = ref(args.typeFilter)

      const onReset = () => {
        query.value = ''
        typeFilter.value = 'All'
      }

      return {
        query,
        typeFilter,
        onReset,
      }
    },
    template: `
      <ItemFilter 
        v-model:query="query"
        v-model:typeFilter="typeFilter"
        @reset="onReset"
      />
    `,
  }),
}
