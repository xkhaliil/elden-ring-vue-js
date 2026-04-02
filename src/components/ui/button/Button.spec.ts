import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders default slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me',
      },
    })
    expect(wrapper.text()).toContain('Click Me')
    expect(wrapper.classes()).toContain('inline-flex')
    expect(wrapper.classes()).toContain('items-center')
  })

  it('renders with destructive variant', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'destructive',
      },
      slots: {
        default: 'Delete',
      },
    })
    expect(wrapper.text()).toContain('Delete')
    expect(wrapper.classes()).toContain('bg-destructive')
  })

  it('renders with outline variant', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'outline',
      },
      slots: {
        default: 'Cancel',
      },
    })
    expect(wrapper.text()).toContain('Cancel')
    expect(wrapper.classes()).toContain('border')
  })

  it('renders with ghost variant', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'ghost',
      },
      slots: {
        default: 'Ghost',
      },
    })
    expect(wrapper.text()).toContain('Ghost')
    expect(wrapper.classes()).toContain('hover:bg-accent')
  })

  it('renders as a custom element when asChild is true', () => {
    const wrapper = mount(Button, {
      props: {
        asChild: true,
        as: 'a',
      },
      slots: {
        default: '<a>Link Button</a>',
      },
    })
    expect(wrapper.element.tagName).toBe('A')
  })
})
