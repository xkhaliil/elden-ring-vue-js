import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('renders correctly', () => {
    const wrapper = mount(Input)

    expect(wrapper.element.tagName).toBe('INPUT')
    expect(wrapper.classes()).toContain('h-9')
    expect(wrapper.classes()).toContain('w-full')
    expect(wrapper.classes()).toContain('rounded-md')
  })

  it('binds modelValue', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'Initial text',
      },
    })

    const inputElement = wrapper.element as HTMLInputElement
    expect(inputElement.value).toBe('Initial text')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('New text')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New text'])
  })

  it('applies disabled attributes and classes', () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true,
      },
    })

    const inputElement = wrapper.element as HTMLInputElement
    expect(inputElement.disabled).toBe(true)
    expect(wrapper.classes()).toContain('disabled:cursor-not-allowed')
    expect(wrapper.classes()).toContain('disabled:opacity-50')
  })

  it('accepts custom type attributes', () => {
    const wrapper = mount(Input, {
      attrs: {
        type: 'password',
        placeholder: 'Enter password',
      },
    })

    const inputElement = wrapper.element as HTMLInputElement
    expect(inputElement.type).toBe('password')
    expect(inputElement.placeholder).toBe('Enter password')
  })
})
