import React from 'react'
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import Login from './Login'

describe('Login component', () => {
  test('renders without errors', () => {
    render(<Login />, {wrapper: MemoryRouter})
  })

  test('handles form submission', async () => {
    render(<Login />, {
      wrapper: MemoryRouter,
    })

    const emailInput = screen.getByLabelText('Email:')
    const passwordInput = screen.getByLabelText('Password:')
    fireEvent.change(emailInput, {target: {value: 'test@example.com'}})
    fireEvent.change(passwordInput, {target: {value: 'password123'}})

    const loginButton = screen.getByText('Login')
    fireEvent.click(loginButton)
  })

  test('navigates to register page when Register link is clicked', async () => {
    render(<Login />, {wrapper: MemoryRouter})

    const registerLink = screen.getByText('Register')
    expect(registerLink.getAttribute('href')).toBe('/register')

    fireEvent.click(registerLink)
    // await waitForElementToBeRemoved(() => screen.queryByText('Register'))
    
    // await waitForElementToBeRemoved(() => screen.queryByText(/register/i))
    await waitForElementToBeRemoved(screen.queryByText(/register/i))
    // await waitForElementToBeRemoved(() =>
    //   screen.queryByRole('link', {
    //     name: /register/i,
    //   }),
    // )
  })
})
