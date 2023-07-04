import axios from 'axios'
import {QuizData} from '../types/QuizData'

export const fetchQuizs = async () => {
  try {
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://mini-test-quiz-back-production.up.railway.app'

    const response = await axios.get(`${baseUrl}/quiz`)

    // if (response.status !== 200) {
    //   throw new Error('Failed to fetch quizs')
    // }

    const data: QuizData[] = response.data
    return data
  } catch (err) {
    throw new Error((err as Error).message)
  }
}
