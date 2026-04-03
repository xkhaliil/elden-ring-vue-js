/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  }),
)

const meta: Meta<any> = {
  title: 'UI/Form',
  tags: ['autodocs'],
  render: () => ({
    components: {
      Button,
      FormControl,
      FormDescription,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
      Input,
      Card,
      CardHeader,
      CardTitle,
      CardDescription,
      CardContent,
    },
    setup() {
      const form = useForm({
        validationSchema: formSchema,
      })

      const onSubmit = form.handleSubmit((values) => {
        console.log('Form submitted!', values)
      })

      return { form, onSubmit }
    },
    template: `
      <Card class="w-[400px]">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your account details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit="onSubmit" class="space-y-6">
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="shadcn" v-bind="componentField" />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    `,
  }),
}

type Story = StoryObj<any>
export default meta

export const Default: Story = {}
