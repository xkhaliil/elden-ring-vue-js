import type { Preview } from '@storybook/vue3-vite'
import '../src/style.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'grey',
      values: [
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'grey',
          value: '#f1f5f9',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
