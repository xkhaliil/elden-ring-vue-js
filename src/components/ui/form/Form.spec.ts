import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'

describe('Form components', () => {
  it('renders a full form structure', () => {
    const wrapper = mount({
      components: {
        Form,
        FormField,
        FormItem,
        FormLabel,
        FormControl,
        FormDescription,
        FormMessage,
      },
      template: `
        <Form>
          <FormField name="username">
            <template #default="{ componentField }">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Enter your username.</FormDescription>
                <FormMessage />
              </FormItem>
            </template>
          </FormField>
        </Form>
      `,
    })

    expect(wrapper.text()).toContain('Username')
    expect(wrapper.text()).toContain('Enter your username.')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)

    const formItem = wrapper.findComponent(FormItem)
    expect(formItem.classes()).toContain('grid')
    expect(formItem.classes()).toContain('gap-2')

    const formLabel = wrapper.findComponent(FormLabel)
    expect(formLabel.classes()).toContain('text-sm')
    expect(formLabel.classes()).toContain('font-medium')
  })
})
