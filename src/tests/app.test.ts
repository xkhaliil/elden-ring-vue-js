import { render } from '@testing-library/vue'
import { describe, expect, it, beforeAll, vi } from 'vitest'
import App from '../App.vue'

// Mock router
const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
}

describe('App component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('renders the App component', () => {
    render(App, {
      global: {
        stubs: {
          RouterView: true,
          RouterLink: true,
        },
        mocks: {
          $router: mockRouter,
        },
      },
    })

    // We can just check that it renders without throwing
    expect(document.querySelector('#app')).toBeTruthy()
  })
})
