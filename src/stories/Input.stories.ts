import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-vue-next'

const meta: Meta<any> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    type: 'text',
    placeholder: 'Enter something...',
    disabled: false,
  },
  render: (args: any) => ({
    components: { Input, Label },
    setup() {
      return { args }
    },
    template: `
      <div class="grid w-full max-w-sm items-center gap-1.5 p-4">
        <Label for="email">Email</Label>
        <Input id="email" v-bind="args" />
        <p class="text-sm text-muted-foreground">Enter your email address.</p>
      </div>
    `,
  }),
}

type Story = StoryObj<any>
export default meta

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Email: Story = { args: { type: 'email', placeholder: 'm@example.com' } }
export const Password: Story = { args: { type: 'password', placeholder: 'Password' } }

export const WithButton: Story = {
  render: (args: any) => ({
    components: { Input, Button },
    setup() {
      return { args }
    },
    template: `
      <div class="flex w-full max-w-sm items-center space-x-2 p-4">
        <Input v-bind="args" placeholder="Email" />
        <Button type="submit">Subscribe</Button>
      </div>
    `,
  }),
}

export const File: Story = {
  args: {
    type: 'file',
  },
  render: (args: any) => ({
    components: { Input, Label },
    setup() {
      return { args }
    },
    template: `
      <div class="grid w-full max-w-sm items-center gap-1.5 p-4">
        <Label for="picture">Picture</Label>
        <Input id="picture" v-bind="args" />
      </div>
    `,
  }),
}
