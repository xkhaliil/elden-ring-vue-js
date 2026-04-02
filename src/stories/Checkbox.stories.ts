import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const meta: Meta<any> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    disabled: false,
  },
  render: (args: any) => ({
    components: { Checkbox, Label },
    setup() {
      return { args }
    },
    template: `
      <div class="items-top flex space-x-2 p-4">
        <Checkbox id="terms1" v-bind="args" />
        <div class="grid gap-1.5 leading-none">
          <Label for="terms1" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Accept terms and conditions
          </Label>
          <p class="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    `,
  }),
}

type Story = StoryObj<any>
export default meta

export const Default: Story = {}
export const Checked: Story = { args: { checked: true } }
export const Disabled: Story = { args: { disabled: true } }
