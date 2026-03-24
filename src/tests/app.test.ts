import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import App from '../App.vue'

describe('counter component', () => {
  it('renders the initial counter value', () => {
    render(App)
    const counterValue = screen.getByText('Counter: 0')
    expect(counterValue).toBeTruthy()
  })

  it('increments the counter when the increment button is clicked', async () => {
    render(App)
    const incrementButton = screen.getByText('Increment')
    await fireEvent.click(incrementButton)
    const counterValue = screen.getByText('Counter: 1')
    expect(counterValue).toBeTruthy()
  })

  it('decrements the counter when the decrement button is clicked', async () => {
    render(App)
    const decrementButton = screen.getByText('Decrement')
    await fireEvent.click(decrementButton)
    const counterValue = screen.getByText('Counter: -1')
    expect(counterValue).toBeTruthy()
  })

  it('resets the counter when the reset button is clicked', async () => {
    render(App)
    const resetButton = screen.getByText('Reset')
    await fireEvent.click(resetButton)
    const counterValue = screen.getByText('Counter: 0')
    expect(counterValue).toBeTruthy()
  })
})
