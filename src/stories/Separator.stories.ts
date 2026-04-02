/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Separator } from '@/components/ui/separator'

const meta: Meta<any> = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args: any) => ({
    components: { Separator },
    setup() {
      return { args }
    },
    template: `
      <div>
        <div class="space-y-1">
          <h4 class="text-sm font-medium leading-none">Elden Ring Wiki</h4>
          <p class="text-sm text-muted-foreground">
            An open-source wiki for Elden Ring.
          </p>
        </div>
        <Separator class="my-4" v-bind="args" />
        <div class="flex h-5 items-center space-x-4 text-sm">
          <div>Bosses</div>
          <Separator orientation="vertical" />
          <div>Weapons</div>
          <Separator orientation="vertical" />
          <div>Items</div>
        </div>
      </div>
    `,
  }),
}

type Story = StoryObj<any>
export default meta

export const Default: Story = {}
