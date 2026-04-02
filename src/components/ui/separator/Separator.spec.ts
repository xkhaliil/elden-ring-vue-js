import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Separator } from '@/components/ui/separator'

describe('Separator', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Separator)

    expect(wrapper.attributes('data-orientation')).toBe('horizontal')
    expect(wrapper.classes()).toContain('shrink-0')
    expect(wrapper.classes()).toContain('bg-border')
    expect(wrapper.classes()).toContain('data-[orientation=horizontal]:h-px')
    expect(wrapper.classes()).toContain('data-[orientation=horizontal]:w-full')
  })

  it('renders with vertical orientation', () => {
    const wrapper = mount(Separator, {
      props: {
        orientation: 'vertical',
      },
    })

    expect(wrapper.attributes('data-orientation')).toBe('vertical')
    expect(wrapper.classes()).toContain('shrink-0')
    expect(wrapper.classes()).toContain('bg-border')
    expect(wrapper.classes()).toContain('data-[orientation=vertical]:h-full')
    expect(wrapper.classes()).toContain('data-[orientation=vertical]:w-px')
  })

  it('renders with asChild prop', () => {
    const wrapper = mount(Separator, {
      props: {
        asChild: true,
      },
    })

    // Reka UI Separator might render as an empty element if no slot is provided
    // We just verify it mounts without errors
    expect(wrapper.exists()).toBe(true)
  })

  it('applies custom classes', () => {
    const wrapper = mount(Separator, {
      props: {
        class: 'my-4 bg-red-500',
      },
    })

    expect(wrapper.classes()).toContain('my-4')
    expect(wrapper.classes()).toContain('bg-red-500')
    // Still has default structure classes
    expect(wrapper.classes()).toContain('shrink-0')
  })
})
