/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '@/components/ui/button'
import { Mail, Loader2, ChevronRight } from 'lucide-vue-next'

const meta: Meta<any> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
  },
  args: {
    variant: 'default',
    size: 'default',
  },
  render: (args: any) => ({
    components: { Button, Mail, Loader2, ChevronRight },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center gap-4">
        <Button v-bind="args">Click Me</Button>
      </div>
    `,
  }),
}

type Story = StoryObj<any>
export default meta

export const Default: Story = {}
export const Destructive: Story = { args: { variant: 'destructive' } }
export const Outline: Story = { args: { variant: 'outline' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Link: Story = { args: { variant: 'link' } }

export const WithIcon: Story = {
  render: (args: any) => ({
    components: { Button, Mail },
    setup() {
      return { args }
    },
    template: `
      <Button v-bind="args">
        <Mail class="w-4 h-4 mr-2" />
        Login with Email
      </Button>
    `,
  }),
}

export const Loading: Story = {
  args: {
    disabled: true,
  },
  render: (args: any) => ({
    components: { Button, Loader2 },
    setup() {
      return { args }
    },
    template: `
      <Button v-bind="args">
        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
        Please wait
      </Button>
    `,
  }),
}

export const IconOnly: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
  },
  render: (args: any) => ({
    components: { Button, ChevronRight },
    setup() {
      return { args }
    },
    template: `
      <Button v-bind="args">
        <ChevronRight class="w-4 h-4" />
      </Button>
    `,
  }),
}
