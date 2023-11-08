import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios'

type QuizContextProviderProps = {
  children: React.ReactNode
}

export type Quiz = {
  _id: string
  rounds: {
    questions: string
    responses: string[]
    corrects: number[]
  }[]
  categories: string[]
  name: string
}

type QuizContextValue = {
  quizs: Quiz[] | undefined
  setQuizs: React.Dispatch<React.SetStateAction<Quiz[] | undefined>>
  updateQuizs: () => void
}

export const QuizContext = createContext<QuizContextValue>({
  quizs: undefined,
  setQuizs: () => {},
  updateQuizs: () => {},
})

const QuizContextProvider = ({children}: QuizContextProviderProps) => {
  const [quizs, setQuizs] = useState<Quiz[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuizs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/quiz');
      // const response = await axios.get(
      //   'https://mini-test-quiz-back-production.up.railway.app/quiz',
      // )
      const data: Quiz[] = response.data
      setQuizs(data)
    } catch (err) {
      setError((err as Error).message)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizs()
  }, [])

  // Function for updating quizs
  const updateQuizs = async () => {
    setIsLoading(true)
    setError(null)
    await fetchQuizs()
  }

  const quizContextValue: QuizContextValue = {
    quizs,
    setQuizs,
    updateQuizs,
  }

  return (
    <QuizContext.Provider value={quizContextValue}>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        children
      )}
    </QuizContext.Provider>
  )
}

export default QuizContextProvider
