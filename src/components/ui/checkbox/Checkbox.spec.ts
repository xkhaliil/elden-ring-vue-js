import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Checkbox } from '@/components/ui/checkbox'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.attributes('aria-checked')).toBe('false')
    expect(wrapper.classes()).toContain('peer')
    expect(wrapper.classes()).toContain('size-4')
  })

  it('renders checked when modelValue is true', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: true,
      },
    })

    expect(wrapper.attributes('aria-checked')).toBe('true')
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders disabled state', () => {
    const wrapper = mount(Checkbox, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('disabled:cursor-not-allowed')
    expect(wrapper.classes()).toContain('disabled:opacity-50')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
      },
    })

    await wrapper.trigger('click')

    const emitEvents = wrapper.emitted('update:modelValue')
    expect(emitEvents).toBeTruthy()
    if (emitEvents) {
      expect(emitEvents[0]).toEqual([true])
    }
  })
})
