import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, fn, within } from 'storybook/test'
import { vueRouter } from 'storybook-vue3-router'

import Header from './Header.vue'

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    vueRouter([
      {
        path: '/',
        name: 'home',
        component: { template: '<div>Home</div>' },
      },
      {
        path: '/bosses',
        name: 'bosses',
        component: { template: '<div>Bosses</div>' },
      },
      {
        path: '/weapons',
        name: 'weapons',
        component: { template: '<div>Weapons</div>' },
      },
      {
        path: '/items',
        name: 'items',
        component: { template: '<div>Items</div>' },
      },
    ]),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onclicktoBosses: fn(),
    onclicktoWeapons: fn(),
    onclicktoItems: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const onclicktoBosses: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const bossesLink = canvas.getByRole('link', { name: /bosses/i })
    bossesLink.addEventListener('click', (e) => e.preventDefault(), {
      once: true,
    })
    bossesLink.click()
    expect(args.onclicktoBosses).toHaveBeenCalled()
  },
}

export const onclicktoWeapons: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const weaponsLink = canvas.getByRole('link', { name: /weapons/i })
    weaponsLink.addEventListener('click', (e) => e.preventDefault(), {
      once: true,
    })
    weaponsLink.click()
    expect(args.onclicktoWeapons).toHaveBeenCalled()
  },
}

export const onclicktoItems: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const itemsLink = canvas.getByRole('link', { name: /items/i })
    itemsLink.addEventListener('click', (e) => e.preventDefault(), {
      once: true,
    })
    itemsLink.click()
    expect(args.onclicktoItems).toHaveBeenCalled()
  },
}
