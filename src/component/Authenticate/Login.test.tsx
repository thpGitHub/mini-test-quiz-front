import React from 'react'
import Login from './Login'
import userEvent from '@testing-library/user-event'
import {render, screen, act} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'

// https://testing-library.com/docs/example-react-router/
// https://testing-library.com/docs/user-event/intro
// "@testing-library/user-event": "^13.5.0",

describe('Login component', () => {
  test('renders without errors', () => {
    render(<Login />, {wrapper: MemoryRouter})
  })

  test('handles form submission', async () => {
    const user = userEvent.setup()
    render(<Login />, {
      wrapper: MemoryRouter,
    })

    const emailInput = screen.getByLabelText('Email:')
    const passwordInput = screen.getByLabelText('Password:')
    user.type(emailInput, 'test@example.com')
    user.type(passwordInput, 'password123')

    const loginButton = screen.getByText('Login')
    user.click(loginButton)
  })

  test('navigates to register page when Register link is clicked', async () => {
    const user = userEvent.setup()
    render(<Login />, {wrapper: MemoryRouter})

    const registerLink = screen.getByText('Register')
    expect(registerLink.getAttribute('href')).toBe('/register')

    await act(() => user.click(registerLink))
    expect(screen.getByText(/Register/i)).toBeInTheDocument()
  })
})
