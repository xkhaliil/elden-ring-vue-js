import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders correctly with default variant', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Test Badge',
      },
    })
    expect(wrapper.text()).toContain('Test Badge')
    expect(wrapper.classes()).toContain('inline-flex')
    expect(wrapper.classes()).toContain('items-center')
  })

  it('renders with secondary variant', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'secondary',
      },
      slots: {
        default: 'Secondary Badge',
      },
    })
    expect(wrapper.text()).toContain('Secondary Badge')
    expect(wrapper.classes()).toContain('bg-secondary')
  })

  it('renders with destructive variant', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'destructive',
      },
      slots: {
        default: 'Destructive Badge',
      },
    })
    expect(wrapper.text()).toContain('Destructive Badge')
    expect(wrapper.classes()).toContain('bg-destructive')
  })
})
