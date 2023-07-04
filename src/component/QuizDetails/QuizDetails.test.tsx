import React from 'react'
import {render, screen} from '@testing-library/react'
import QuizDetails from './QuizDetails'
import useQuizDetails from '../../hooks/useQuizDetails'
import {MemoryRouter} from 'react-router-dom'

jest.mock('../../hooks/useQuizDetails')

describe('QuizDetails', () => {
  beforeEach(() => {
    ;(useQuizDetails as jest.Mock).mockReturnValue({
      quizName: 'Mock Quiz',
      isLoading: false,
      showAlert: false,
      messageAlert: '',
      responsesList: ['Option A', 'Option B'],
      handleResponse: jest.fn(),
      currentQuestion: 0,
      questionDescription: 'Mock question description',
    })
  })

  test('renders quiz details correctly', () => {
    render(
      <MemoryRouter>
        <QuizDetails />
      </MemoryRouter>,
    )
    // Assert that the quiz name is rendered
    expect(screen.getByText('Mock Quiz')).toBeInTheDocument()

    expect(screen.getByText(/question 1 :/i)).toBeInTheDocument()
    expect(screen.getByText('Mock question description')).toBeInTheDocument()

    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()

    expect(screen.getByText('Retour liste des Quizs')).toBeInTheDocument()
  })

  test('renders loading message when isLoading is true', () => {
    ;(useQuizDetails as jest.Mock).mockReturnValueOnce({
      isLoading: true,
    } as ReturnType<typeof useQuizDetails>)

    render(<QuizDetails />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
