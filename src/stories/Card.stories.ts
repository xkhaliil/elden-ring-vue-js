import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta: Meta<any> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  render: (args: any) => ({
    components: {
      Card,
      CardHeader,
      CardTitle,
      CardDescription,
      CardContent,
      CardFooter,
      Button,
      Input,
      Label,
    },
    setup() {
      return { args }
    },
    template: `
      <Card class="w-[350px]" v-bind="args">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div class="grid items-center w-full gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <Label for="framework">Framework</Label>
                <Input id="framework" placeholder="Vue, React, Svelte..." />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    `,
  }),
}

type Story = StoryObj<any>
export default meta

export const Default: Story = {}
