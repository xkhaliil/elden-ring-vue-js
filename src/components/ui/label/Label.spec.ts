import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Label } from '@/components/ui/label'

describe('Label', () => {
  it('renders default slot content', () => {
    const wrapper = mount(Label, {
      slots: {
        default: 'Email Address',
      },
    })

    expect(wrapper.text()).toContain('Email Address')
    expect(wrapper.classes()).toContain('text-sm')
    expect(wrapper.classes()).toContain('font-medium')
    expect(wrapper.classes()).toContain('leading-none')
  })

  it('renders as label element by default', () => {
    const wrapper = mount(Label, {
      slots: {
        default: 'Test Label',
      },
    })

    expect(wrapper.element.tagName).toBe('LABEL')
  })

  it('accepts for attribute', () => {
    const wrapper = mount(Label, {
      props: {
        for: 'email-input',
      },
      slots: {
        default: 'Email',
      },
    })

    expect(wrapper.attributes('for')).toBe('email-input')
  })

  it('renders as custom element with asChild prop', () => {
    const wrapper = mount(Label, {
      props: {
        asChild: true,
      },
      slots: {
        default: '<span>Span Label</span>',
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('applies custom classes along with default ones', () => {
    const wrapper = mount(Label, {
      props: {
        class: 'text-red-500 mt-2',
      },
      slots: {
        default: 'Custom Styled Label',
      },
    })

    expect(wrapper.classes()).toContain('text-red-500')
    expect(wrapper.classes()).toContain('mt-2')
    // still has default styles
    expect(wrapper.classes()).toContain('text-sm')
    expect(wrapper.classes()).toContain('font-medium')
  })
})
