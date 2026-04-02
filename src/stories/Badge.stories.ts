import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Badge } from '@/components/ui/badge'

const meta: Meta<any> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    },
  },
  render: (args: any) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: `
      <Badge v-bind="args">{{ args.label }}</Badge>
    `,
  }),
}

type Story = StoryObj<any>
export default meta

export const Default: Story = {
  args: {
    label: 'Badge',
    variant: 'default',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  args: {
    label: 'Destructive',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    label: 'Outline',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    label: 'Ghost',
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    label: 'Link',
    variant: 'link',
  },
}
