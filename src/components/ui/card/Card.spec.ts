import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

describe('Card components', () => {
  it('renders a full card structure', () => {
    const wrapper = mount({
      components: { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter },
      template: `
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      `,
    })

    expect(wrapper.text()).toContain('Card Title')
    expect(wrapper.text()).toContain('Card Description')
    expect(wrapper.text()).toContain('Card Content')
    expect(wrapper.text()).toContain('Card Footer')

    const card = wrapper.findComponent(Card)
    expect(card.classes()).toContain('rounded-xl')
    expect(card.classes()).toContain('border')
    expect(card.classes()).toContain('bg-card')
  })

  it('renders Card components with custom classes', () => {
    const wrapper = mount(CardTitle, {
      props: {
        class: 'text-red-500',
      },
      slots: {
        default: 'Custom Title',
      },
    })

    expect(wrapper.text()).toContain('Custom Title')
    expect(wrapper.classes()).toContain('text-red-500')
    expect(wrapper.classes()).toContain('font-semibold')
  })
})
