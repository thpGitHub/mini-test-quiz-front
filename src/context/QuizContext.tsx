import React, {createContext} from 'react'
import useFetchQuizs from '../hooks/useFetchQuizs'

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

export const QuizContext = createContext<Quiz[]>([])

const QuizContextProvider = ({children}: QuizContextProviderProps) => {
  const {quizs} = useFetchQuizs()

  return <QuizContext.Provider value={quizs}>{children}</QuizContext.Provider>
}

export default QuizContextProvider
