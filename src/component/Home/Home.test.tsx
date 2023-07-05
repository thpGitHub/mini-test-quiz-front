import React from 'react'
import Home from './Home'
import 'jest-localstorage-mock'
import {render, screen, waitFor} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'

describe('Home component', () => {
  beforeEach(() => {
    // Set a mock token in localStorage
    localStorage.setItem('token', 'mockedToken')
  })

  it('renders QuizList when token is present', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    // expect(
    //   screen.getByRole('heading', {
    //     name: /liste des quizz/i,
    //   }),
    // ).toBeInTheDocument()

    // await waitFor(() => {
    //     expect(
    //       screen.getByRole('heading', {
    //         name: /liste des quizz/i
    //       })
    //     ).toBeInTheDocument();
    //   });

    // expect(
    //   screen.queryByRole('button', {
    //     name: /login/i,
    //   }),
    // ).not.toBeInTheDocument()
  })

  it('renders Login when token is not present', () => {
    localStorage.removeItem('token')

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.queryByRole('heading', {name: /liste des quizz/i}),
    ).not.toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /login/i,
      }),
    ).toBeInTheDocument()
  })
})
