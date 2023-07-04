import React from 'react'
import {render, screen} from '@testing-library/react'
import QuizDetails from './QuizDetails'
import useQuizDetails from '../../hooks/useQuizDetails'
import {MemoryRouter} from 'react-router-dom'

jest.mock('../../hooks/useQuizDetails') // Mock the custom hook

describe('QuizDetails', () => {
  beforeEach(() => {
    (useQuizDetails as jest.Mock).mockReturnValue({
    // useQuizDetails.mockReturnValue({
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

    // Assert that the current question and its description are rendered
    expect(
      screen.getByText('Question 1 : Mock question description'),
    ).toBeInTheDocument()

    // Assert that the response buttons are rendered
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()

    // Assert that the "Retour liste des Quizs" button is rendered
    expect(screen.getByText('Retour liste des Quizs')).toBeInTheDocument()
  })

  //   test('renders loading message when isLoading is true', () => {
  //     (useQuizDetails as jest.Mock).mockReturnValueOnce({ isLoading: true } as ReturnType<typeof useQuizDetails>);

  //     render(<QuizDetails />);

  //     // Assert that the loading message is rendered
  //     expect(screen.getByText('Loading...')).toBeInTheDocument();
  //   });

  // You can write more tests to cover other scenarios and functionality
})
