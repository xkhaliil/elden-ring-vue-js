/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const meta: Meta<any> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  render: (args: any) => ({
    components: { Label, Input },
    setup() {
      return { args }
    },
    template: `
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="email">Your email address</Label>
        <Input id="email" type="email" placeholder="Email" />
      </div>
    `,
  }),
}

type Story = StoryObj<any>
export default meta

export const Default: Story = {}
